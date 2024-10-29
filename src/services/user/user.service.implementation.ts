import { User } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user/user.repository";
import { UserService } from "./user.service";

export class UserServiceImplementation implements UserService {
  private constructor(readonly repository: UserRepository) {}

  public static build(repository: UserRepository) {
    return new UserServiceImplementation(repository);
  }

  async create(
    name: string,
    email: string,
    avatarUrl: string
  ): Promise<User | null> {
    const aUser = User.build(name, email, avatarUrl);

    const result = await this.repository.save(aUser);

    if (result) {
      return User.with({
        ...result,
      });
    }

    return null;
  }

  async update(user: User): Promise<User | null> {
    const aUser = User.with(user.props);

    const result = await this.repository.update(aUser);

    if (result) {
      return User.with({
        ...result,
      });
    }

    return null;
  }

  async find(id: string): Promise<User | null> {
    const aUser = await this.repository.find(id);

    if (aUser) {
      return User.with({
        ...aUser,
      });
    }

    return aUser;
  }
  async findByEmail(email: string): Promise<User | null> {
    const aUser = await this.repository.findByEmail(email);

    if (aUser) {
      return User.with({
        ...aUser,
      });
    }

    return aUser;
  }
}
