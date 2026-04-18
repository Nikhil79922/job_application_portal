import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import { redis } from "./config/redis";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import jobRoutes from "./routes/job.route";
import { verifyToken } from "./middlewares/auth.middleware";


const app = Fastify({ 
  logger: {
    level: "info"
  },
    bodyLimit: 10485760, // optional (10MB)
});

     app.register(rateLimit, {
      global:true,
        max: 200,
        timeWindow: "1 minute",
        redis : redis ,
        keyGenerator: (req) => {
          return req.headers.authorization || req.ip;
        },
      });



app.addContentTypeParser("*", (req, payload, done) => {
    let data = "";
    payload.on("data", (chunk) => {
      data += chunk;
    });
    payload.on("end", () => {
      done(null, data); // raw string instead of stream
    });
  });

app.addHook("preHandler", async (req, reply) => {
    const isPublic = req.url.startsWith("/api/auth");
  
    if (!isPublic) {
      await verifyToken(req, reply);
    }
  });

// register routes
app.register(authRoutes);
app.register(userRoutes);
app.register(jobRoutes);

app.setErrorHandler((error:any, req, reply) => {
    if (error.statusCode && error.statusCode < 500) {
      return reply.status(error.statusCode).send(error);
    }

    reply.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  });

export default app;