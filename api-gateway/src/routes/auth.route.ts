import { FastifyInstance } from "fastify";
import { proxyRequest } from "../services/proxy.service";
import { env } from "../config/env";
import { authBreaker } from "../utils/breakers";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.all("/api/auth/*", async (req, reply) => {
    const result = await proxyRequest(
      req,
      env.SERVICES.AUTH,
      authBreaker
    );
  
    return reply.status(result.status).send(result.data);
  });
}