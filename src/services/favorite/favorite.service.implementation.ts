import { Favorite } from "../../entities/favorite.entity";
import { Sheet } from "../../entities/sheet.entity";
import { FavoriteRepository } from "../../repositories/favorite/favorite.repository";
import { FindByUserReturn } from "../../types/favorite";
import { FavoriteService } from "./favorite.service";

export class FavoriteServiceImplementation implements FavoriteService {
  private constructor(readonly repository: FavoriteRepository) {}

  public static build(repository: FavoriteRepository) {
    return new FavoriteServiceImplementation(repository);
  }

  async create(userId: string, sheetId: string): Promise<Favorite | null> {
    const result = await this.repository.save(userId, sheetId);

    if (result) {
      return Favorite.with({ ...result });
    }

    return null;
  }

  async findByUser(userId: string): Promise<FindByUserReturn> {
    const result = await this.repository.findByUser(userId);

    const favorites = result.favorites.map((favorite) => {
      return {
        favoriteId: favorite.id,
        sheet: favorite.sheet,
      };
    });

    return {
      favorites,
    };
  }

  async delete(favoriteId: string): Promise<void> {
    await this.repository.delete(favoriteId);
  }
}
