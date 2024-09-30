import { FastifyInstance } from "fastify";
import { CreateSheetDTO, DeleteSheetDTO } from "./sheet.routes.dto";
import { prisma } from "../../../database/prisma";
import { SheetRepositoryPrisma } from "../../../repositories/sheet/prisma/sheet.repository.prisma";
import { SheetServiceImplementation } from "../../../services/sheet/sheet.service.implementation";
import { Sheet } from "../../../entities/sheet.entity";

export async function sheetRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateSheetDTO }>("/", async (req, reply) => {
    const { badges, mp3Url, pdfUrl, songWriter, title, userId } = req.body;

    const aRepository = SheetRepositoryPrisma.build(prisma);
    const aService = SheetServiceImplementation.build(aRepository);

    const aSheet = Sheet.build(
      title,
      songWriter,
      pdfUrl,
      mp3Url,
      badges,
      userId
    );

    const sheetCreated = await aService.create(aSheet);

    console.log(sheetCreated);

    return reply.status(201).send({ sheet: sheetCreated?.props });
  });

  fastify.delete<{ Params: DeleteSheetDTO }>("/:id", async (req, reply) => {
    const { id } = req.params;

    const aRepository = SheetRepositoryPrisma.build(prisma);
    const aService = SheetServiceImplementation.build(aRepository);

    await aService.delete(id);

    return reply.status(200).send({ message: "sheet deleted" });
  });
}
