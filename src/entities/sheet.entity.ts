export type SheetProps = {
  id: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  title: string;
  songWriter: string;
  pdfUrl: string;
  mp3Url: string;
  badges: string[];
  userId: string;
};

export class Sheet {
  private constructor(readonly props: SheetProps) {}

  public static build(
    title: string,
    songWriter: string,
    pdfUrl: string,
    mp3Url: string,
    badges: string[],
    userId: string
  ) {
    return new Sheet({
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      title,
      songWriter,
      pdfUrl,
      mp3Url,
      badges,
      userId,
    });
  }

  public static with(sheet: SheetProps) {
    return new Sheet({
      ...sheet,
    });
  }

  public get id(): string | undefined {
    return this.props.id;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get title(): string {
    return this.props.title;
  }

  public get songWriter(): string {
    return this.props.songWriter;
  }

  public get pdfUrl(): string {
    return this.props.pdfUrl;
  }

  public get mp3Url(): string {
    return this.props.mp3Url;
  }

  public get badges(): string[] {
    return this.props.badges;
  }

  public get userId(): string {
    return this.props.userId;
  }
}
