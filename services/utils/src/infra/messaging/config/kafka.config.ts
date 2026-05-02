import { Kafka } from "kafkajs"

export const kafka = new Kafka({
    clientId: 'auth-service',
    brokers: [process.env.KAKFA_BROKER || 'localhost:9092'],
})