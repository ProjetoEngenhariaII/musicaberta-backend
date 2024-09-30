import { Sheet } from "../../entities/sheet.entity";

export interface SheetService {
  create(sheet: Sheet): Promise<Sheet | null>;
  delete(sheetId: string): Promise<void>;
}
