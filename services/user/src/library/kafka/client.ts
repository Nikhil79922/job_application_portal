
import { Kafka } from "kafkajs"

export const kafka = new Kafka({
    clientId: 'auth-service',
    brokers: [process.env.Kakfa_Broker || 'localhost:9092'],
})