import { Sheet } from "../../entities/sheet.entity";

export interface SheetService {
  create(sheet: Sheet): Promise<Sheet | null>;
}
