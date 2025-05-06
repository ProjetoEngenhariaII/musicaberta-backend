import { Request } from "../../entities/request.entity";
import { RequestWithSheets, RequestWithUser } from "../../types/request";

export interface RequestService {
  create(request: Request): Promise<Request | null>;
  findAll(): Promise<RequestWithUser[] | null>;
  findByUser(userId: string): Promise<Request[] | null>;
  findById(requestId: string): Promise<RequestWithSheets | null>;
}
