import { Request } from "../../entities/request.entity";

export interface RequestService {
  create(request: Request): Promise<Request | null>;
}
