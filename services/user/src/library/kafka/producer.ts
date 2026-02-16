import { Producer } from "kafkajs"
import { kafka } from "./kafkaClient" // adjust import

export class KafkaProducer {
  private static producer: Producer | null = null

  /** Initialize producer (call once on app startup) */
  static async connect(): Promise<void> {
    if (this.producer) {
      console.log("⚠️ Kafka producer already connected")
      return
    }

    try {
      this.producer = kafka.producer()
      await this.producer.connect()
      console.log("✅ Kafka producer connected")
    } catch (error) {
      console.error("❌ Kafka producer connection failed", error)
      throw error
    }
  }

  /** Publish message to topic */
  static async publish<T>(topic: string, message: T): Promise<void> {
    if (!this.producer) {
      throw new Error("Kafka Producer is not initialized. Call connect() first.")
    }

    try {
      await this.producer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      })
    } catch (error) {
      console.error(`❌ Failed to publish message to topic: ${topic}`, error)
      throw error
    }
  }

  /** Gracefully disconnect */
  static async disconnect(): Promise<void> {
    if (!this.producer) return

    try {
      await this.producer.disconnect()
      this.producer = null
      console.log("🛑 Kafka producer disconnected")
    } catch (error) {
      console.error("❌ Kafka producer disconnect failed", error)
    }
  }
}
