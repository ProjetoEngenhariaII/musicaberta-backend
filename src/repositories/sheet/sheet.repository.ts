import { Sheet } from "../../entities/sheet.entity";

export interface SheetRepository {
  save(sheet: Sheet): Promise<Sheet | null>;
  delete(sheetId: string): Promise<void>;
}
