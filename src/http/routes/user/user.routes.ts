import { FastifyInstance } from "fastify";
import { CreateUserDTO, FindUserDTO } from "./user.routes.dto";
import { prisma } from "../../../database/prisma";
import { UserRepositoryPrisma } from "../../../repositories/user/prisma/user.repository.prisma";
import { UserServiceImplementation } from "../../../services/user/user.service.implementation";
import { isAuthenticated } from "../auth/isAuthenticated";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateUserDTO }>("/", async (req, reply) => {
    const { name, email, avatarUrl } = req.body;

    const aRepository = UserRepositoryPrisma.build(prisma);
    const aService = UserServiceImplementation.build(aRepository);

    const userAlreadyExists = await aService.find(email);

    if (userAlreadyExists) {
      return reply.code(400).send({ message: "User already exists" });
    }

    const userCreated = await aService.create(name, email, avatarUrl);

    return reply.status(201).send({ user: userCreated?.props });
  });

  fastify.get<{ Params: FindUserDTO }>(
    "/:email",
    { preHandler: isAuthenticated },
    async (req, reply) => {
      const { email } = req.params;

      const aRepository = UserRepositoryPrisma.build(prisma);
      const aService = UserServiceImplementation.build(aRepository);

      const result = await aService.find(email);

      if (!result) {
        return reply.status(404).send({ message: "User does not exist." });
      }

      return reply.status(200).send({
        user: result?.props,
      });
    }
  );
}
