import { Request as RequestPrisma } from "@prisma/client";
import { SheetWithUser } from "./sheet";

export interface RequestWithUser extends RequestPrisma {
  user: {
    name: string;
    avatarUrl: string;
  };
  _count: {
    Sheet: number;
  };
}

export interface RequestWithSheets extends RequestWithUser {
  Sheet: SheetWithUser[];
}

export type FindAllRequestsReturn = {
  requests: RequestWithUser[];
  total: number;
};
