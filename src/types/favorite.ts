import { Sheet } from "../entities/sheet.entity";
import { Sheet as SheetPrisma } from "@prisma/client";

export type findByUserReturn = {
  favorites: { sheet: Omit<Sheet, "props">; favoriteId: string }[];
};
export type findByUserPrismaReturn = {
  favorites: { sheet: SheetPrisma; id: string }[];
};
