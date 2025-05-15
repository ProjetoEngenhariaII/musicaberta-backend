import { Prisma, PrismaClient, Request as RequestPrisma } from "@prisma/client";
import { Request } from "../../../entities/request.entity";
import { RequestRepository } from "../request.repository";
import {
  FindAllRequestsReturn,
  RequestWithSheets,
} from "../../../types/request";

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

  async findAll(
    search: string | undefined,
    sort: "asc" | "desc" | "mostContributed",
    skip: number,
    perPage: number
  ): Promise<FindAllRequestsReturn | null> {
    const where: Prisma.RequestWhereInput = search
      ? {
          OR: [
            {
              title: {
                contains: search || "",
                mode: "insensitive",
              },
            },
            {
              badges: {
                contains: search || "",
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const total = await this.prisma.request.count({ where });

    if (sort === "mostContributed") {
      const requests = await this.prisma.request.findMany({
        skip,
        take: perPage,
        where,
        include: {
          user: {
            select: {
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
          Sheet: {
            _count: "desc",
          },
        },
      });

      return { requests, total };
    }

    const requests = await this.prisma.request.findMany({
      skip,
      take: perPage,
      where,
      include: {
        user: {
          select: {
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
      total,
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
        Sheet: {
          include: {
            user: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        user: {
          select: {
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

    return result || null;
  }
}
