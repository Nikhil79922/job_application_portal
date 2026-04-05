import { FastifyInstance } from "fastify";
import { proxyRequest } from "../services/proxy.service";
import { env } from "../config/env";


export default async function userRoute(fastify: FastifyInstance){
    fastify.all("/api/user/*" , async (req,reply)=>{
        const data = await proxyRequest(req,reply, env.SERVICES.USER);
        return reply.send(data);
    })
}