import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../user.repository";
import { User } from "../../../entities/user.entity";

export class UserRepositoryPrisma implements UserRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepositoryPrisma(prisma);
  }

  async save(user: User): Promise<User | null> {
    const result = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        bio: "",
      },
    });

    if (result) {
      return User.with({
        ...result,
      });
    }

    return null;
  }

  async update(user: User): Promise<User | null> {
    const result = await this.prisma.user.update({
      data: {
        roles: user.roles,
        instruments: user.instruments,
        bio: user.bio,
      },
      where: {
        email: user.email,
      },
    });

    if (result) {
      return User.with({
        ...result,
      });
    }

    return null;
  }

  async find(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (user) {
      return User.with({
        ...user,
      });
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (user) {
      return User.with({
        ...user,
      });
    }

    return user;
  }
}
