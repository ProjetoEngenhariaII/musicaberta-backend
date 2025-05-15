import { Request } from "../../entities/request.entity";
import { Request as RequestPrisma } from "@prisma/client";
import { FindAllRequestsReturn, RequestWithSheets } from "../../types/request";

export interface RequestRepository {
  save(request: Request): Promise<RequestPrisma | null>;
  findAll(
    search: string | undefined,
    sort: "asc" | "desc" | "mostContributed",
    skip: number,
    perPage: number
  ): Promise<FindAllRequestsReturn | null>;
  findByUser(userId: string): Promise<RequestPrisma[] | null>;
  findById(requestId: string): Promise<RequestWithSheets | null>;
}
