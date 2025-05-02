import { FastifyInstance } from "fastify";
import { CreateRequestDTO } from "./request.routes.dto";
import { prisma } from "../../../database/prisma";
import { RequestRepositoryImplementation } from "../../../repositories/request/request.repository.implementation";
import { RequestServiceImplementation } from "../../../services/request/request.service.implementation";
import { Request } from "../../../entities/request.entity";

export async function requestRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateRequestDTO }>("/", async (req, reply) => {
    const { title, description, badges, userId } = req.body;

    const aRepository = RequestRepositoryImplementation.build(prisma);
    const aService = RequestServiceImplementation.build(aRepository);

    const aRequest = Request.build(title, description, badges, userId);

    const requestCreated = await aService.create(aRequest);

    return reply.status(201).send({ request: requestCreated?.props });
  });
}
