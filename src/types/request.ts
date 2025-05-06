import { Request as RequestPrisma, Sheet as SheetPrisma } from "@prisma/client";
import { Sheet } from "../entities/sheet.entity";

export interface RequestWithUser extends RequestPrisma {
  user: {
    name: string;
    avatarUrl: string;
  };
  _count: {
    Sheet: number;
  };
}

export interface RequestWithSheets {
  request: RequestWithUser | null;
  sheets: Sheet[];
}

export type FindAllRequestsPrismaReturn = {
  requests: RequestWithUser[];
};
