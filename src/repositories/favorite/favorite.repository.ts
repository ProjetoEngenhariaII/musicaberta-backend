import { Favorite as FavoritePrisma } from "@prisma/client";
import { FindByUserPrismaReturn } from "../../types/favorite";

export interface FavoriteRepository {
  save(userId: string, sheetId: string): Promise<FavoritePrisma | null>;
  findByUser(userId: string): Promise<FindByUserPrismaReturn>;
  delete(favoriteId: string): Promise<void>;
}
