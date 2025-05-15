import { Request } from "../../entities/request.entity";
import { RequestRepository } from "../../repositories/request/request.repository";
import {
  FindAllRequestsReturn,
  RequestWithSheets,
  RequestWithUser,
} from "../../types/request";
import { RequestService } from "./request.service";

export class RequestServiceImplementation implements RequestService {
  private constructor(readonly repository: RequestRepository) {}

  public static build(repository: RequestRepository) {
    return new RequestServiceImplementation(repository);
  }

  async create(request: Request): Promise<Request | null> {
    const { title, description, badges, userId } = request.props;

    const aRequest = Request.build(title, description, badges, userId);

    const result = await this.repository.save(aRequest);

    if (result) {
      return Request.with({ ...result });
    }

    return null;
  }

  async findAll(
    search: string | undefined,
    sort: "asc" | "desc" | "mostContributed",
    skip: number,
    perPage: number
  ): Promise<FindAllRequestsReturn | null> {
    const result = await this.repository.findAll(search, sort, skip, perPage);

    if (!result) return null;

    return result;
  }

  async findByUser(userId: string): Promise<Request[] | null> {
    const result = await this.repository.findByUser(userId);

    if (!result) return null;

    return result.map((request) =>
      Request.with({
        ...request,
      })
    );
  }

  async findById(requestId: string): Promise<RequestWithSheets | null> {
    const result = await this.repository.findById(requestId);

    if (!result) return null;

    return result;
  }
}
