import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../../../utils/jwt";

export async function isAuthenticated(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const rawToken = req.headers.authorization;
  const tokenParts = rawToken?.split("Bearer");
  const token = tokenParts?.[1];

  const payload = await verifyToken(token ?? "");

  if (!payload) {
    return reply.code(401).send({
      message: "Invalid token",
    });
  }
}
