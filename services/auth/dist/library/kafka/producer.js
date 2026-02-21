import { kafka } from "./client.js"; // adjust import
export class KafkaProducer {
    /** Initialize producer (call once on app startup) */
    static async connect() {
        if (this.producer) {
            console.log("⚠️ Kafka producer already connected");
            return;
        }
        try {
            this.producer = kafka.producer();
            await this.producer.connect();
            console.log("✅ Kafka producer connected");
        }
        catch (error) {
            console.error("❌ Kafka producer connection failed", error);
            throw error;
        }
    }
    /** Publish message to topic */
    static async publish(topic, message) {
        if (!this.producer) {
            throw new Error("Kafka Producer is not initialized. Call connect() first.");
        }
        try {
            await this.producer.send({
                topic,
                messages: [
                    {
                        value: JSON.stringify(message),
                    },
                ],
            });
        }
        catch (error) {
            console.error(`❌ Failed to publish message to topic: ${topic}`, error);
            throw error;
        }
    }
    /** Gracefully disconnect */
    static async disconnect() {
        if (!this.producer)
            return;
        try {
            await this.producer.disconnect();
            this.producer = null;
            console.log("🛑 Kafka producer disconnected");
        }
        catch (error) {
            console.error("❌ Kafka producer disconnect failed", error);
        }
    }
}
KafkaProducer.producer = null;
