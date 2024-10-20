import { Favorite } from "../../entities/favorite.entity";
import { Sheet } from "../../entities/sheet.entity";

export interface FavoriteRepository {
  save(userId: string, sheetId: string): Promise<Favorite | null>;
  findByUser(userId: string): Promise<{ sheets: Sheet[]; favoriteId: string }>;
  delete(favoriteId: string): Promise<void>;
}
