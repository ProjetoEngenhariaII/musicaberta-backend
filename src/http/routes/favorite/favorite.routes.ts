import { FastifyInstance } from "fastify";
import { prisma } from "../../../database/prisma";
import { CreateFavoriteDTO, DeleteFavoriteDTO } from "./favorite.routes.dto";
import { FavoriteRepositoryPrisma } from "../../../repositories/favorite/prisma/favorite.repository.prisma";
import { FavoriteServiceImplementation } from "../../../services/favorite/favorite.service.implementation";

export async function favoriteRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateFavoriteDTO }>("/", async (req, reply) => {
    const { userId, sheetId } = req.body;

    const aRepository = FavoriteRepositoryPrisma.build(prisma);
    const aService = FavoriteServiceImplementation.build(aRepository);

    const result = await aService.create(userId, sheetId);

    return reply.status(201).send({ favorite: result?.props });
  });

  fastify.delete<{ Querystring: DeleteFavoriteDTO }>(
    "/",
    async (req, reply) => {
      const { id } = req.query;

      const aRepository = FavoriteRepositoryPrisma.build(prisma);
      const aService = FavoriteServiceImplementation.build(aRepository);

      await aService.delete(id);

      return reply.status(200).send({ message: "favorite deleted" });
    }
  );
}
