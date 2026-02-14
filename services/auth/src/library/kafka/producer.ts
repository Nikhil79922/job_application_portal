import { kafka } from './client.js'
import { Producer } from 'kafkajs'
let producer: Producer
export const kafkaProducer = async () => {
    try {
        producer = kafka.producer()
        await producer.connect()
        console.log("✅ Kafka producer connected...")
    } catch (error) {
        console.log("❌ Kafka producer failed", error)
    }

}


export const publishToTopic = async (topic: string, message: any) => {
    if (!producer) {
        console.error("Kafka Producer is not initialized")
    }
    try {
        await producer.send({
            topic,
            messages: [
                {
                    value: JSON.stringify(message)
                }
            ]
        })
    } catch (error) {
        console.log("❌ Failed to publish message to Kafka", error)
    }
}

export const disconnectProducer = async () => {
    if (producer) {
        await producer.disconnect();
    }
}