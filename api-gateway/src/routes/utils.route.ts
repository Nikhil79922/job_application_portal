import { FastifyInstance } from "fastify";
import { proxyRequest } from "../services/proxy.service";
import { env } from "../config/env";
import { utilsBreaker } from "../utils/breakers";


export default async function utilsRoute(fastify: FastifyInstance) {
    fastify.all("/api/utils/*", async (req, reply) => {
        if (req.method === "OPTIONS") {
            return reply.status(204).send()
        }
        const result = await proxyRequest(req, env.SERVICES.UTILS, utilsBreaker);
        return reply.status(result.status).send(result.data);
    })
}