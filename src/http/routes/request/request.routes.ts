import { FastifyInstance } from "fastify";
import {
  CreateRequestDTO,
  GetRequestByIdDTO,
  GetRequestByUserIdDTO,
} from "./request.routes.dto";
import { prisma } from "../../../database/prisma";
import { RequestRepositoryImplementation } from "../../../repositories/request/prisma/request.repository.implementation";
import { RequestServiceImplementation } from "../../../services/request/request.service.implementation";
import { Request } from "../../../entities/request.entity";
import { Sheet } from "../../../entities/sheet.entity";

export async function requestRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateRequestDTO }>("/", async (req, reply) => {
    const { title, description, badges, userId } = req.body;

    const aRepository = RequestRepositoryImplementation.build(prisma);
    const aService = RequestServiceImplementation.build(aRepository);

    const aRequest = Request.build(title, description, badges, userId);

    const requestCreated = await aService.create(aRequest);

    return reply.status(201).send({ request: requestCreated?.props });
  });

  fastify.get("/", async (_, reply) => {
    const aRepository = RequestRepositoryImplementation.build(prisma);
    const aService = RequestServiceImplementation.build(aRepository);

    const requests = await aService.findAll();

    return reply.status(200).send({ requests });
  });

  fastify.get<{ Params: GetRequestByIdDTO }>(
    "/:requestId",
    async (req, reply) => {
      const { requestId } = req.params;

      const aRepository = RequestRepositoryImplementation.build(prisma);
      const aService = RequestServiceImplementation.build(aRepository);

      const result = await aService.findById(requestId);
      const sheets = result?.sheets.map((sheet) => sheet.props);

      return reply.status(200).send({ request: result?.request, sheets });
    }
  );
  fastify.get<{ Querystring: GetRequestByUserIdDTO }>(
    "/user",
    async (req, reply) => {
      const { userId } = req.query;

      const aRepository = RequestRepositoryImplementation.build(prisma);
      const aService = RequestServiceImplementation.build(aRepository);

      const result = await aService.findByUser(userId);

      return reply
        .status(200)
        .send({ requests: result?.map((request) => request.props) });
    }
  );
}
