import { FastifyInstance } from "fastify";
import { proxyRequest } from "../services/proxy.service";
import { env } from "../config/env";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.all("/api/auth/*", async (req, reply) => {
    const data = await proxyRequest(req,reply, env.SERVICES.AUTH);
      // handle error response from service
  if (data?.status) {
    return reply.status(data.status).send(data.data);
  }
    return reply.send(data);
  });
}