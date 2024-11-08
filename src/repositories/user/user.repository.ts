import { User as UserPrisma } from "@prisma/client";
import { User } from "../../entities/user.entity";

export interface UserRepository {
  save(user: User): Promise<UserPrisma | null>;
  update(user: User): Promise<UserPrisma | null>;
  find(id: string): Promise<UserPrisma | null>;
  findByEmail(email: string): Promise<UserPrisma | null>;
}
