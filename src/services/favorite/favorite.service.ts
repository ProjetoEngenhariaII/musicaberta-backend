import { Favorite } from "../../entities/favorite.entity";
import { FindByUserReturn } from "../../types/favorite";

export interface FavoriteService {
  create(userId: string, sheetId: string): Promise<Favorite | null>;
  findByUser(userId: string): Promise<FindByUserReturn>;
  delete(favoriteId: string): Promise<void>;
}
