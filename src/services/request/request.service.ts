import { Request } from "../../entities/request.entity";
import { FindAllRequestsReturn, RequestWithSheets } from "../../types/request";

export interface RequestService {
  create(request: Request): Promise<Request | null>;
  findAll(
    search: string | undefined,
    sort: "asc" | "desc" | "mostContributed",
    skip: number,
    perPage: number
  ): Promise<FindAllRequestsReturn | null>;
  findByUser(userId: string): Promise<Request[] | null>;
  findById(requestId: string): Promise<RequestWithSheets | null>;
}
