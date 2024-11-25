import { Sheet } from "../../entities/sheet.entity";
import { Sheet as SheetPrisma } from "@prisma/client";

export interface SheetRepository {
  save(sheet: Sheet): Promise<SheetPrisma | null>;
  delete(sheetId: string): Promise<void>;
  findAll(
    search: string | undefined,
    sort: "asc" | "desc" | "mostFavorited",
    skip: number,
    perPage: number
  ): Promise<{ sheets: SheetPrisma[]; total: number }>;
  findByUser(userId: string): Promise<SheetPrisma[]>;
}
