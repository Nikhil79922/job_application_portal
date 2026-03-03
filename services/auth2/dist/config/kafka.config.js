import { env } from "./env.js";
import { Kafka } from "kafkajs";
export const kafka = new Kafka({
    clientId: 'auth-service',
    brokers: [env.Kakfa_Broker || 'localhost:9092'],
});
