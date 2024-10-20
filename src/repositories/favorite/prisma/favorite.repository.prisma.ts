import { PrismaClient } from "@prisma/client";
import { FavoriteRepository } from "../favorite.repository";
import { Favorite } from "../../../entities/favorite.entity";
import { Sheet } from "../../../entities/sheet.entity";

export class FavoriteRepositoryPrisma implements FavoriteRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new FavoriteRepositoryPrisma(prisma);
  }

  async save(userId: string, sheetId: string): Promise<Favorite | null> {
    const result = await this.prisma.favorite.create({
      data: {
        sheetId,
        userId,
      },
    });

    if (result) {
      return Favorite.with({ ...result });
    }

    return null;
  }

  findByUser(userId: string): Promise<{ sheets: Sheet[]; favoriteId: string }> {
    throw new Error("Method not implemented.");
  }

  async delete(favoriteId: string): Promise<void> {
    await this.prisma.favorite.delete({
      where: {
        id: favoriteId,
      },
    });
  }
}
