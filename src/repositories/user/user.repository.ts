import { User } from "../../entities/user.entity";

export interface UserRepository {
  save(user: User): Promise<User | null>;
  update(user: User): Promise<User | null>;
  find(email: string): Promise<User | null>;
}
