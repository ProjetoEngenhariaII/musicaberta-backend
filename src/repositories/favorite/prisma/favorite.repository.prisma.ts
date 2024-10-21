import { PrismaClient } from "@prisma/client";
import { FavoriteRepository } from "../favorite.repository";
import { Favorite } from "../../../entities/favorite.entity";
import { Sheet } from "../../../entities/sheet.entity";
import {
  findByUserPrismaReturn,
  findByUserReturn,
} from "../../../types/favorite";

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

  async findByUser(userId: string): Promise<findByUserPrismaReturn> {
    const result = await this.prisma.favorite.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        sheet: true,
      },
    });

    return {
      favorites: result,
    };
  }

  async delete(favoriteId: string): Promise<void> {
    await this.prisma.favorite.delete({
      where: {
        id: favoriteId,
      },
    });
  }
}
