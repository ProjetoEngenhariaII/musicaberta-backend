import { Sheet } from "../../entities/sheet.entity";

export interface SheetRepository {
  save(sheet: Sheet): Promise<Sheet | null>;
  delete(sheetId: string): Promise<void>;
  findAll(
    search: string | undefined,
    sort: "asc" | "desc",
    skip: number,
    perPage: number
  ): Promise<{ sheets: Sheet[]; total: number }>;
  findByUser(userId: string): Promise<Sheet[]>;
}
