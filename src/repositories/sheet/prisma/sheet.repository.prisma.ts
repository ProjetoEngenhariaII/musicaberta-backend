import { PrismaClient } from "@prisma/client";
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
}
