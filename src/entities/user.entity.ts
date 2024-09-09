export type UserProps = {
  id?: string;
  createdAt?: Date;
  name: string;
  email: string;
  bio: string;
  roles: string[];
  instruments: string[];
  avatarUrl: string;
};

export class User {
  private constructor(readonly props: UserProps) {}

  public static build(name: string, email: string, avatarUrl: string) {
    return new User({
      name,
      email,
      avatarUrl,
      bio: "",
      instruments: [],
      roles: [],
    });
  }

  public static with(user: UserProps) {
    return new User({
      ...user,
    });
  }

  public get id(): string | undefined {
    return this.props.id;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get bio(): string {
    return this.props.bio;
  }

  public get roles(): string[] {
    return this.props.roles;
  }

  public get instruments(): string[] {
    return this.props.instruments;
  }

  public get avatarUrl(): string {
    return this.props.avatarUrl;
  }
}
