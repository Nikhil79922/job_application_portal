// src/routes/job.route.ts

import { FastifyInstance } from "fastify";
import { proxyRequest } from "../services/proxy.service";
import { env } from "../config/env";
import { jobBreaker } from "../utils/breakers";

export default async function jobRoutes(fastify: FastifyInstance) {
  fastify.all("/api/job/*", async (req, reply) => {
    if (req.method === "OPTIONS") {
      return reply.status(204).send()
  }
    const result = await proxyRequest(req, env.SERVICES.JOB,jobBreaker);
    return reply.status(result.status).send(result.data);
  });
}