import { Sheet } from "../../entities/sheet.entity";

export interface SheetService {
  create(sheet: Sheet): Promise<Sheet | null>;
  delete(sheetId: string): Promise<void>;
  findAll(
    search: string | undefined,
    sort: "asc" | "desc" | "mostFavorited",
    skip: number,
    perPage: number
  ): Promise<{ sheets: Sheet[]; total: number }>;
  findByUser(userId: string): Promise<Sheet[]>;
}
