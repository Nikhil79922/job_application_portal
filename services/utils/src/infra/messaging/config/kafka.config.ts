import { Kafka } from "kafkajs"

export const kafka = new Kafka({
    clientId: 'utils-service',
    brokers: [process.env.KAKFA_BROKER || 'localhost:9092'],
})