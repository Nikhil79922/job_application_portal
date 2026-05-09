import { FastifyInstance } from "fastify";
import { proxyRequest } from "../services/proxy.service";
import { env } from "../config/env";
import { utilsBreaker } from "../utils/breakers";
import { aiQuotaMiddleware } from "../middlewares/aiQuota.middleware";

export default async function utilsRoute(
  fastify: FastifyInstance
) {
  fastify.addHook("onRequest", async (req, reply) => {
    if (req.url.startsWith("/api/utils/ai")) {
      await aiQuotaMiddleware(req, reply);
    }
  });
  fastify.all("/api/utils/*", async (req, reply) => {

    if (req.method === "OPTIONS") {
      return reply.status(204).send();
    }
    const result = await proxyRequest(req, env.SERVICES.UTILS,utilsBreaker);
    return reply
      .status(result.status)
      .send(result.data);
  });
}