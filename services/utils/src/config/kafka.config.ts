import { Kafka } from "kafkajs"
import { env } from "./env.js"

export const kafka = new Kafka({
    clientId: 'utils-service',
    brokers: [env.KAFKA_BROKER || 'localhost:9092'],
})