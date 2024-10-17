import { Prisma, PrismaClient } from "@prisma/client";
import { SheetRepository } from "../sheet.repository";
import { Sheet } from "../../../entities/sheet.entity";

export class SheetRepositoryPrisma implements SheetRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new SheetRepositoryPrisma(prisma);
  }

  async save(sheet: Sheet): Promise<Sheet | null> {
    const { badges, mp3Url, pdfUrl, songWriter, userId, title } = sheet.props;

    const result = await this.prisma.sheet.create({
      data: {
        mp3Url,
        pdfUrl,
        songWriter,
        title,
        badges,
        userId,
      },
    });

    if (result) {
      return Sheet.with({
        ...result,
      });
    }

    return null;
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
    sort: "asc" | "desc",
    skip: number,
    perPage: number
  ): Promise<{ sheets: Sheet[]; total: number }> {
    const where: Prisma.SheetWhereInput = {
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
      ],
    };

    const total = await this.prisma.sheet.count({ where });

    const result = await this.prisma.sheet.findMany({
      skip,
      take: perPage,
      where,
      orderBy: [
        {
          createdAt: sort,
        },
      ],
    });

    const sheets = result.map((sheet) => Sheet.with(sheet));

    return { sheets, total };
  }

  async findByUser(userId: string): Promise<Sheet[]> {
    const result = await this.prisma.sheet.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const sheets = result.map((sheet) => Sheet.with(sheet));

    return sheets;
  }
}
