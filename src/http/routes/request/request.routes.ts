import { FastifyInstance } from "fastify";
import {
  CreateRequestDTO,
  GetRequestByIdDTO,
  GetRequestByUserIdDTO,
  GetRequestQueryDTO,
} from "./request.routes.dto";
import { prisma } from "../../../database/prisma";
import { RequestRepositoryImplementation } from "../../../repositories/request/prisma/request.repository.prisma";
import { RequestServiceImplementation } from "../../../services/request/request.service.implementation";
import { Request } from "../../../entities/request.entity";

export async function requestRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (error) {
      console.log(error);
      return reply.status(401).send({ message: "Unauthorized", error });
    }
  });

  fastify.post<{ Body: CreateRequestDTO }>("/", async (req, reply) => {
    const { title, description, badges, userId } = req.body;

    const aRepository = RequestRepositoryImplementation.build(prisma);
    const aService = RequestServiceImplementation.build(aRepository);

    const aRequest = Request.build(title, description, badges, userId);

    const requestCreated = await aService.create(aRequest);

    return reply.status(201).send({ request: requestCreated?.props });
  });

  fastify.get<{ Querystring: GetRequestQueryDTO }>("/", async (req, reply) => {
    const { search, sort } = req.query;
    const page = Number(req.query.page);

    const perPage = 6;
    const skip = (page - 1) * perPage;

    const aRepository = RequestRepositoryImplementation.build(prisma);
    const aService = RequestServiceImplementation.build(aRepository);

    const result = await aService.findAll(
      search,
      sort || "desc",
      skip,
      perPage
    );

    if (!result) {
      return reply.status(404).send({ message: "No requests found" });
    }

    const { requests, total } = result;

    const last = Math.ceil(total / perPage);

    const meta = {
      current: page,
      path: "/requests",
      prev: page > 1 ? page - 1 : null,
      next: page < last ? page + 1 : null,
      last,
      total,
    };

    return reply.status(200).send({ data: requests, meta });
  });

  fastify.get<{ Params: GetRequestByIdDTO }>(
    "/:requestId",
    async (req, reply) => {
      const { requestId } = req.params;

      const aRepository = RequestRepositoryImplementation.build(prisma);
      const aService = RequestServiceImplementation.build(aRepository);

      const request = await aService.findById(requestId);

      return reply.status(200).send({ request });
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
