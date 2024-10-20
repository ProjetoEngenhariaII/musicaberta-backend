import { Favorite } from "../../entities/favorite.entity";
import { Sheet } from "../../entities/sheet.entity";
import { FavoriteRepository } from "../../repositories/favorite/favorite.repository";
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

  findByUser(userId: string): Promise<Sheet[]> {
    throw new Error("Method not implemented.");
  }

  async delete(favoriteId: string): Promise<void> {
    await this.repository.delete(favoriteId);
  }
}
