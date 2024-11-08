export type FavoriteProps = {
  id: string | undefined;
  createdAt: Date | undefined;
  userId: string;
  sheetId: string;
};

export class Favorite {
  private constructor(readonly props: FavoriteProps) {}

  public static build(userId: string, sheetId: string) {
    return new Favorite({
      id: undefined,
      createdAt: undefined,
      userId,
      sheetId,
    });
  }

  public static with(favorite: FavoriteProps) {
    return new Favorite({
      ...favorite,
    });
  }

  public get id(): string | undefined {
    return this.props.id;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get sheetId(): string {
    return this.props.sheetId;
  }
}
