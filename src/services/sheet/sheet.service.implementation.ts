import { Sheet } from "../../entities/sheet.entity";
import { SheetRepository } from "../../repositories/sheet/sheet.repository";
import { SheetService } from "./sheet.service";

export class SheetServiceImplementation implements SheetService {
  private constructor(readonly repository: SheetRepository) {}

  public static build(repository: SheetRepository) {
    return new SheetServiceImplementation(repository);
  }

  async create(sheet: Sheet): Promise<Sheet | null> {
    const { badges, mp3Url, pdfUrl, songWriter, userId, title } = sheet.props;

    const aSheet = Sheet.build(
      title,
      songWriter,
      pdfUrl,
      mp3Url,
      badges,
      userId
    );

    const result = await this.repository.save(aSheet);

    if (result) {
      return Sheet.with({
        ...result,
      });
    }

    return null;
  }

  async delete(sheetId: string): Promise<void> {
    await this.repository.delete(sheetId);
  }

  async findAll(
    search: string | undefined,
    sort: "asc" | "desc",
    skip: number,
    perPage: number
  ): Promise<{ sheets: Sheet[]; total: number }> {
    const { sheets, total } = await this.repository.findAll(
      search,
      sort,
      skip,
      perPage
    );

    const sheetsFormatted = sheets.map((sheet) => Sheet.with(sheet));

    return { sheets: sheetsFormatted, total };
  }

  async findByUser(userId: string): Promise<Sheet[]> {
    const sheets = await this.repository.findByUser(userId);
    const sheetsFormatted = sheets.map((sheet) => Sheet.with(sheet));

    return sheetsFormatted;
  }
}
