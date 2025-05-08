import { Sheet as SheetPrisma } from "@prisma/client";

export interface SheetWithUser extends SheetPrisma {
  user: {
    name: string;
    avatarUrl: string;
  };
}
