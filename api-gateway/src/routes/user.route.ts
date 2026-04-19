import { FastifyInstance } from "fastify";
import { proxyRequest } from "../services/proxy.service";
import { env } from "../config/env";
import { userBreaker } from "../utils/breakers";


export default async function userRoute(fastify: FastifyInstance){
    fastify.all("/api/user/*" , async (req,reply)=>{
        const result = await proxyRequest(req,env.SERVICES.USER,userBreaker);
        return reply.status(result.status).send(result.data);
    })
}