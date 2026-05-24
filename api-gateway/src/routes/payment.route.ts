import { FastifyInstance } from "fastify";
import { proxyRequest } from "../services/proxy.service";
import { env } from "../config/env";
import { PaymentBreaker } from "../utils/breakers";


export default async function userRoute(fastify: FastifyInstance){
    fastify.all("/api/payment/*" , async (req,reply)=>{
        if (req.method === "OPTIONS") {
            return reply.status(204).send()
        }
        const result = await proxyRequest(req,env.SERVICES.PAYMENT,PaymentBreaker);
        return reply.status(result.status).send(result.data);
    })
}