import { Partitioners } from "kafkajs";
import { kafka } from "../../config/kafka.config.js";
import AppError from "../../shared/errors/AppError.js";
export class KafkaProducer {
    constructor() {
        this.producer = null;
        this.connecting = null;
    }
    // 🔹 Centralized connection logic (safe + idempotent)
    async ensureConnected() {
        if (this.producer)
            return;
        if (!this.connecting) {
            console.log("Kafka Producer connecting...");
            this.connecting = (async () => {
                try {
                    const producer = kafka.producer({
                        createPartitioner: Partitioners.LegacyPartitioner, // silence warning
                    });
                    await producer.connect();
                    console.log("✅ Kafka Producer connected");
                    this.producer = producer;
                }
                catch (error) {
                    console.error("❌ Kafka connect error:", error);
                    this.producer = null;
                    throw new AppError("Kafka Producer connection failed. Service unavailable.", 503);
                }
                finally {
                    this.connecting = null;
                }
            })();
        }
        return this.connecting;
    }
    // 🔹 Public connect (optional manual call)
    async connect() {
        await this.ensureConnected();
    }
    // 🔥 FIXED: publish auto-connects
    async publish(topic, message) {
        await this.ensureConnected(); // ✅ THIS IS THE MAIN FIX
        try {
            await this.producer.send({
                topic,
                messages: [
                    {
                        value: JSON.stringify(message),
                    },
                ],
            });
            console.log(`📤 Message sent to topic: ${topic}`);
        }
        catch (error) {
            console.error("❌ Kafka publish error:", error);
            throw new AppError(`Failed to publish message to topic: ${topic}`, 503);
        }
    }
    async disconnect() {
        if (!this.producer)
            return;
        try {
            await this.producer.disconnect();
            console.log("🔌 Kafka Producer disconnected");
            this.producer = null;
        }
        catch (error) {
            console.error("❌ Kafka disconnect error:", error);
            throw new AppError("Kafka Producer disconnection failed.", 500);
        }
    }
    getInstance() {
        if (!this.producer) {
            throw new AppError("Kafka Producer is not initialized.", 503);
        }
        return this.producer;
    }
}
