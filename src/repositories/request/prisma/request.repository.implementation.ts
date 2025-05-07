import { PrismaClient, Request as RequestPrisma } from "@prisma/client";
import { Request } from "../../../entities/request.entity";
import { RequestRepository } from "../request.repository";
import {
  FindAllRequestsPrismaReturn,
  RequestWithSheets,
} from "../../../types/request";
import { Sheet } from "../../../entities/sheet.entity";

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

  async findAll(): Promise<FindAllRequestsPrismaReturn | null> {
    const requests = await this.prisma.request.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            Sheet: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      requests,
    };
  }

  async findByUser(userId: string): Promise<RequestPrisma[] | null> {
    const result = await this.prisma.request.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
  }

  async findById(requestId: string): Promise<RequestWithSheets | null> {
    const result = await this.prisma.request.findUnique({
      where: {
        id: requestId,
      },
      include: {
        Sheet: true,
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            Sheet: true,
          },
        },
      },
    });

    const sheets = result?.Sheet.map((sheet) => Sheet.with({ ...sheet })) || [];

    return {
      request: result || null,
      sheets,
    };
  }
}
