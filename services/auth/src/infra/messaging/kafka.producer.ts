import { Producer, Partitioners } from "kafkajs";
import { kafka } from "../../config/kafka.config.js";
import AppError from "../../shared/errors/AppError.js";
import { IMessageBroker } from "../../domain/interfaces/message-broker.interface.js";

export class KafkaProducer implements IMessageBroker {
  private producer: Producer | null = null;
  private connecting: Promise<void> | null = null;

  // 🔹 Centralized connection logic (safe + idempotent)
  private async ensureConnected(): Promise<void> {
    if (this.producer) return;

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
        } catch (error) {
          console.error("❌ Kafka connect error:", error);

          this.producer = null;

          throw new AppError(
            "Kafka Producer connection failed. Service unavailable.",
            503
          );
        } finally {
          this.connecting = null;
        }
      })();
    }

    return this.connecting;
  }

  // 🔹 Public connect (optional manual call)
  async connect(): Promise<void> {
    await this.ensureConnected();
  }

  // 🔥 FIXED: publish auto-connects
  async publish<T>(topic: string, message: T): Promise<void> {
    await this.ensureConnected(); // ✅ THIS IS THE MAIN FIX

    try {
      await this.producer!.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });

      console.log(`📤 Message sent to topic: ${topic}`);
    } catch (error) {
      console.error("❌ Kafka publish error:", error);

      throw new AppError(
        `Failed to publish message to topic: ${topic}`,
        503
      );
    }
  }

  async disconnect(): Promise<void> {
    if (!this.producer) return;

    try {
      await this.producer.disconnect();
      console.log("🔌 Kafka Producer disconnected");

      this.producer = null;
    } catch (error) {
      console.error("❌ Kafka disconnect error:", error);

      throw new AppError(
        "Kafka Producer disconnection failed.",
        500
      );
    }
  }

  getInstance(): Producer {
    if (!this.producer) {
      throw new AppError(
        "Kafka Producer is not initialized.",
        503
      );
    }

    return this.producer;
  }
}