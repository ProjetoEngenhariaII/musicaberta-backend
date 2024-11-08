import { FastifyInstance } from "fastify";
import { AuthDTO } from "./auth.routes.dto";
import { prisma } from "../../../database/prisma";
import { UserRepositoryPrisma } from "../../../repositories/user/prisma/user.repository.prisma";
import { UserServiceImplementation } from "../../../services/user/user.service.implementation";
import { sign } from "../../../utils/jwt";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: AuthDTO }>("/", async (req, reply) => {
    const { email } = req.body;

    const aRepository = UserRepositoryPrisma.build(prisma);
    const aService = UserServiceImplementation.build(aRepository);

    const user = await aService.find(email);

    if (!user) {
      return reply.code(401).send({ message: "User does not exist." });
    }

    const token = await sign({
      id: user.id ?? "",
      email: user.email,
      name: user.name,
    });

    return reply.code(200).send({ token });
  });
}
