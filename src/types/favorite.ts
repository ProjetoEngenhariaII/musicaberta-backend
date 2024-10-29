import { Sheet } from "../entities/sheet.entity";
import { Sheet as SheetPrisma } from "@prisma/client";

export type FindByUserReturn = {
  favorites: { sheet: Omit<Sheet, "props">; favoriteId: string }[];
};
export type FindByUserPrismaReturn = {
  favorites: { sheet: SheetPrisma; id: string }[];
};
