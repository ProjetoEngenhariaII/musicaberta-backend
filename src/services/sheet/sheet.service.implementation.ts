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

    return result;
  }
}
