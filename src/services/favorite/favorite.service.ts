import { Favorite } from "../../entities/favorite.entity";
import { findByUserReturn } from "../../types/favorite";

export interface FavoriteService {
  create(userId: string, sheetId: string): Promise<Favorite | null>;
  findByUser(userId: string): Promise<findByUserReturn>;
  delete(favoriteId: string): Promise<void>;
}
