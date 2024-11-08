import { Favorite as FavoritePrisma, PrismaClient } from "@prisma/client";
import { FavoriteRepository } from "../favorite.repository";
import { FindByUserPrismaReturn } from "../../../types/favorite";

export class FavoriteRepositoryPrisma implements FavoriteRepository {
  private constructor(readonly prisma: PrismaClient) {}
  public static build(prisma: PrismaClient) {
    return new FavoriteRepositoryPrisma(prisma);
  }

  async save(userId: string, sheetId: string): Promise<FavoritePrisma | null> {
    const result = await this.prisma.favorite.create({
      data: {
        sheetId,
        userId,
      },
    });

    return result;
  }

  async findByUser(userId: string): Promise<FindByUserPrismaReturn> {
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
