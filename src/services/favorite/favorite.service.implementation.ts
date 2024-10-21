import { Favorite } from "../../entities/favorite.entity";
import { Sheet } from "../../entities/sheet.entity";
import { FavoriteRepository } from "../../repositories/favorite/favorite.repository";
import { findByUserReturn } from "../../types/favorite";
import { FavoriteService } from "./favorite.service";

export class FavoriteServiceImplementation implements FavoriteService {
  private constructor(readonly repository: FavoriteRepository) {}

  public static build(repository: FavoriteRepository) {
    return new FavoriteServiceImplementation(repository);
  }

  create(userId: string, sheetId: string): Promise<Favorite | null> {
    const result = this.repository.save(userId, sheetId);

    return result;
  }

  async findByUser(userId: string): Promise<findByUserReturn> {
    const result = await this.repository.findByUser(userId);

    const favorites = result.favorites.map((favorite) => {
      const sheet = Sheet.with({ ...favorite.sheet });

      return {
        favoriteId: favorite.id,
        sheet: sheet.props,
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
