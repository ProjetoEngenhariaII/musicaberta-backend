import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../user.repository";
import { User } from "../../../entities/user.entity";

export class UserRepositoryPrisma implements UserRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepositoryPrisma(prisma);
  }

  async save(user: User): Promise<User | null> {
    const data = {
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    };

    const result = await this.prisma.user.create({
      data,
    });

    if (result) {
      return User.with({
        ...result,
        bio: result.bio || "",
      });
    }

    return null;
  }

  update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async find(email: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({ where: { email } });

    if (result) {
      return User.with({
        ...result,
        bio: result.bio || "",
      });
    }

    return result;
  }
}
