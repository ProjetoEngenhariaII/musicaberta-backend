import { PrismaClient, Request as RequestPrisma } from "@prisma/client";
import { Request } from "../../entities/request.entity";
import { RequestRepository } from "./request.repository";

export class RequestRepositoryImplementation implements RequestRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new RequestRepositoryImplementation(prisma);
  }

  async save(request: Request): Promise<RequestPrisma | null> {
    const { title, description, badges, status, userId } = request.props;

    const result = await this.prisma.request.create({
      data: {
        title,
        description,
        badges,
        status,
        userId,
      },
    });

    return result;
  }
}
