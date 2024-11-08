import { User } from "../../entities/user.entity";

export interface UserService {
  create(name: string, email: string, avatarUrl: string): Promise<User | null>;
  update(user: User): Promise<User | null>;
  find(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
