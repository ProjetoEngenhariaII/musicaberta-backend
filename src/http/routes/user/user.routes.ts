import { FastifyInstance } from "fastify";
import {
  CreateUserDTO,
  FindUserDTO,
  LoginDTO,
  UpdateUserDTO,
} from "./user.routes.dto";
import { prisma } from "../../../database/prisma";
import { UserRepositoryPrisma } from "../../../repositories/user/prisma/user.repository.prisma";
import { UserServiceImplementation } from "../../../services/user/user.service.implementation";
import { User } from "../../../entities/user.entity";
import { verifyPassword } from "../../../utils/hash";
import { clientS3 } from "../../../utils/client.supabase";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

interface JwtPayload {
  id: string;
  name: string;
  email: string;
}

export async function userRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (req, reply) => {
    const publicRoutes = [
      { method: "POST", url: "/users/login" },
      { method: "POST", url: "/users/register" },
    ];

    const isPublic = publicRoutes.some(
      (route) => route.method === req.method && route.url === req.url
    );

    if (isPublic) {
      return;
    }

    try {
      await req.jwtVerify();
    } catch (error) {
      console.log(error);
      return reply.status(401).send({ message: "Unauthorized", error });
    }
  });

  fastify.post<{ Body: CreateUserDTO }>("/register", async (req, reply) => {
    const { name, email, password } = req.body;

    const aRepository = UserRepositoryPrisma.build(prisma);
    const aService = UserServiceImplementation.build(aRepository);

    const userAlreadyExists = await aService.findByEmail(email);

    if (userAlreadyExists) {
      return reply
        .status(400)
        .send({ message: "User already exists with this email" });
    }

    const userCreated = await aService.create(name, email, password);

    if (!userCreated) {
      return reply.status(400).send({ message: "User not created" });
    }

    return reply.status(201).send({ user: userCreated.props });
  });

  fastify.patch<{ Body: UpdateUserDTO; Params: FindUserDTO }>(
    "/:id",
    async (req, reply) => {
      try {
        const { id: userId } = req.params;

        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserServiceImplementation.build(aRepository);

        const userExists = await aService.find(userId);

        if (!userExists) {
          return reply.code(400).send({ message: "Usuário não existe" });
        }

        let avatarUrl = userExists.avatarUrl;
        let bio = userExists.bio;
        let instruments = userExists.instruments;
        let roles = userExists.roles;

        const data = await req.file();

        if (data) {
          const filename = randomUUID();

          if (userExists.avatarUrl) {
            const oldFilename = userExists.avatarUrl.split("/").pop();
            if (oldFilename) {
              const deleteObjectCommand = new DeleteObjectCommand({
                Bucket: "avatars",
                Key: oldFilename,
              });

              try {
                await clientS3.send(deleteObjectCommand);
              } catch (error) {
                console.error("Erro ao deletar imagem antiga:", error);
              }
            }
          }

          const putObjectCommand = new PutObjectCommand({
            Bucket: "avatars",
            Key: filename,
            Body: await data.toBuffer(),
            ContentType: data.mimetype,
          });

          await clientS3.send(putObjectCommand);

          avatarUrl = `http://127.0.0.1:54321/storage/v1/object/public/avatars/${filename}`;

          const fields = data.fields as Record<string, { value: string }>;

          if (fields.bio?.value) {
            bio = fields.bio.value;
          }

          if (fields.instruments?.value) {
            instruments = JSON.parse(fields.instruments.value);
          }

          if (fields.roles?.value) {
            roles = JSON.parse(fields.roles.value);
          }
        }

        const { createdAt, id, name, email, password } = userExists;
        const userToUpdate = User.with({
          bio,
          instruments,
          roles,
          email,
          password,
          avatarUrl: avatarUrl,
          createdAt,
          id,
          name,
        });

        const userUpdated = await aService.update(userToUpdate);

        return reply.status(200).send({ user: userUpdated?.props });
      } catch (error) {
        console.error(error);
        return reply
          .status(500)
          .send({ message: "Erro ao atualizar usuário", error });
      }
    }
  );

  fastify.post<{ Body: LoginDTO }>("/login", async (req, reply) => {
    const { email, password } = req.body;

    const aRepository = UserRepositoryPrisma.build(prisma);
    const aService = UserServiceImplementation.build(aRepository);

    const userExists = await aService.findByEmail(email);

    if (!userExists) {
      return reply.status(400).send({ message: "User does not exist" });
    }

    const passwordIsValid = await verifyPassword(password, userExists.password);

    if (!passwordIsValid) {
      return reply.status(400).send({ message: "Invalid password" });
    }

    const { id, name } = userExists;

    const token = fastify.jwt.sign({
      id,
      name,
      email: userExists.email,
    });

    return reply.status(200).send({
      token,
    });
  });

  fastify.get("/me", async (req, reply) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return reply.status(401).send({ message: "Token não fornecido" });
      }

      const decoded = fastify.jwt.decode(token) as JwtPayload;

      if (!decoded) {
        return reply.status(401).send({ message: "Token inválido" });
      }

      const userId = decoded.id;

      const aRepository = UserRepositoryPrisma.build(prisma);
      const aService = UserServiceImplementation.build(aRepository);

      const userExists = await aService.find(userId);

      if (!userExists) {
        return reply.status(404).send({ message: "Usuário não encontrado" });
      }

      return reply.status(200).send({ user: userExists.props });
    } catch (error) {
      return reply.status(401).send({ message: "Não autorizado", error });
    }
  });
}
