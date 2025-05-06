import { Request } from "../../entities/request.entity";
import { Request as RequestPrisma } from "@prisma/client";
import {
  FindAllRequestsPrismaReturn,
  RequestWithSheets,
} from "../../types/request";

export interface RequestRepository {
  save(request: Request): Promise<RequestPrisma | null>;
  findAll(): Promise<FindAllRequestsPrismaReturn | null>;
  findByUser(userId: string): Promise<RequestPrisma[] | null>;
  findById(requestId: string): Promise<RequestWithSheets | null>;
}
