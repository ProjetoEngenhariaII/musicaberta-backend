import { PrismaClient, User as UserPrisma } from "@prisma/client";
import { UserRepository } from "../user.repository";
import { User } from "../../../entities/user.entity";

export class UserRepositoryPrisma implements UserRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepositoryPrisma(prisma);
  }

  async save(user: User): Promise<UserPrisma | null> {
    const result = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        avatarUrl: "",
        bio: "",
      },
    });

    return result;
  }

  async update(user: User): Promise<UserPrisma | null> {
    const result = await this.prisma.user.update({
      data: {
        roles: user.roles,
        instruments: user.instruments,
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      },
      where: {
        email: user.email,
      },
    });

    return result;
  }

  async find(id: string): Promise<UserPrisma | null> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<UserPrisma | null> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    return user;
  }
}
