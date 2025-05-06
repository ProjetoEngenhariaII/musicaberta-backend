export type RequestProps = {
  id: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  title: string;
  description: string;
  badges: string;
  status: string;
  userId: string;
};

export class Request {
  private constructor(readonly props: RequestProps) {}

  public static build(
    title: string,
    description: string,
    badges: string,
    userId: string
  ) {
    return new Request({
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      title,
      description,
      badges,
      status: "PENDING",
      userId,
    });
  }

  public static with(request: RequestProps) {
    return new Request({
      ...request,
    });
  }

  public get id(): string | undefined {
    return this.props.id;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public get title(): string {
    return this.props.title;
  }

  public get description(): string {
    return this.props.description;
  }

  public get badges(): string {
    return this.props.badges;
  }

  public get status(): string {
    return this.props.status;
  }

  public get userId(): string {
    return this.props.userId;
  }
}
