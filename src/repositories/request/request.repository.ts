import { Request } from "../../entities/request.entity";
import { Request as RequestPrisma } from "@prisma/client";

export interface RequestRepository {
  save(request: Request): Promise<RequestPrisma | null>;
}
