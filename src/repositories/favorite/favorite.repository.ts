import { Favorite } from "../../entities/favorite.entity";
import { findByUserPrismaReturn } from "../../types/favorite";

export interface FavoriteRepository {
  save(userId: string, sheetId: string): Promise<Favorite | null>;
  findByUser(userId: string): Promise<findByUserPrismaReturn>;
  delete(favoriteId: string): Promise<void>;
}
