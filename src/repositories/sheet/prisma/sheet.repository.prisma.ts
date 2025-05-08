import { Prisma, PrismaClient, Sheet as SheetPrisma } from "@prisma/client";
import { SheetRepository } from "../sheet.repository";
import { Sheet } from "../../../entities/sheet.entity";

export class SheetRepositoryPrisma implements SheetRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new SheetRepositoryPrisma(prisma);
  }

  async save(sheet: Sheet): Promise<SheetPrisma | null> {
    const { badges, mp3Url, pdfUrl, songWriter, userId, title, requestId } =
      sheet.props;

    const result = await this.prisma.sheet.create({
      data: {
        mp3Url,
        pdfUrl,
        songWriter,
        title,
        badges,
        userId,
        requestId,
      },
    });

    return result;
  }

  async delete(sheetId: string): Promise<void> {
    await this.prisma.sheet.delete({
      where: {
        id: sheetId,
      },
    });
  }

  async findAll(
    search: string | undefined,
    sort: "asc" | "desc" | "mostFavorited",
    skip: number,
    perPage: number
  ): Promise<{ sheets: SheetPrisma[]; total: number }> {
    const where: Prisma.SheetWhereInput = search
      ? {
          OR: [
            {
              title: {
                contains: search || "",
                mode: "insensitive",
              },
            },

            {
              songWriter: {
                contains: search || "",
                mode: "insensitive",
              },
            },

            {
              badges: {
                hasSome: [search],
              },
            },
          ],
        }
      : {};

    const total = await this.prisma.sheet.count({ where });

    if (sort === "mostFavorited") {
      const result = await this.prisma.sheet.findMany({
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
        },
        orderBy: {
          Favorite: {
            _count: "desc",
          },
        },
      });

      console.log(result);

      return { sheets: result, total };
    }

    const result = await this.prisma.sheet.findMany({
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
      },
      orderBy: [
        {
          createdAt: sort,
        },
      ],
    });
    console.log(result);

    return { sheets: result, total };
  }

  async findByUser(userId: string): Promise<SheetPrisma[]> {
    const result = await this.prisma.sheet.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
  }
}
