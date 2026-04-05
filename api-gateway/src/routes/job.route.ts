// src/routes/job.route.ts

import { FastifyInstance } from "fastify";
import { proxyRequest } from "../services/proxy.service";
import { env } from "../config/env";

export default async function jobRoutes(fastify: FastifyInstance) {
  fastify.all("/api/job/*", async (req, reply) => {
    const data = await proxyRequest(req,reply, env.SERVICES.JOB);
    return reply.send(data);
  });
}