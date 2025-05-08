import { SheetWithUser } from "./sheet";

export type FindByUserReturn = {
  favorites: { sheet: Omit<SheetWithUser, "props">; favoriteId: string }[];
};
export type FindByUserPrismaReturn = {
  favorites: { sheet: SheetWithUser; id: string }[];
};
