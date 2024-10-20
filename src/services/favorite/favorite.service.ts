import { Favorite } from "../../entities/favorite.entity";
import { Sheet } from "../../entities/sheet.entity";

export interface FavoriteService {
  create(userId: string, sheetId: string): Promise<Favorite | null>;
  findByUser(userId: string): Promise<Sheet[]>;
  delete(favoriteId: string): Promise<void>;
}
