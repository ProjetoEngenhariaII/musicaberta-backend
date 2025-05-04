import { Request } from "../../entities/request.entity";
import { RequestRepository } from "../../repositories/request/request.repository";
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

  async findByUser(userId: string): Promise<Request[] | null> {
    const result = await this.repository.findByUser(userId);
    if (!result) return null;

    return result.map((request) =>
      Request.with({
        id: request.id,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
        title: request.title,
        description: request.description,
        badges: request.badges,
        status: request.status,
        userId: request.userId,
      })
    );
  }
}
