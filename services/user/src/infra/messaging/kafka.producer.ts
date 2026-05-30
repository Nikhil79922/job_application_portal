import { Partitioners, Producer } from "kafkajs";
import { kafka } from "../../config/kafka.config.js";
import AppError from "../../shared/errors/AppError.js";
import { IMessageBroker } from "../../domain/interfaces/infraInterfaces/message-broker.interface.js";
import logger from "../../config/logger.js";

export class KafkaProducer implements IMessageBroker {
  private producer: Producer | null = null;
  private connecting: Promise<void> | null = null;

  //  Centralized connection logic (safe + idempotent)
  private async ensureConnected(): Promise<void> {
    if (this.producer) return;

    if (!this.connecting) {
      logger.info("Kafka Producer connecting...");

      this.connecting = (async () => {
        try {
          const producer = kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner, 
          });

          await producer.connect();

          logger.info("✅ Kafka Producer connected");

          this.producer = producer;
        } catch (error) {
          logger.error("❌ Kafka connect error:", { error });

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

  // FIXED: publish auto-connects
  async publish<T>(
    topic: string,
    message: T,
    key?: string
  ): Promise<void> {
    await this.ensureConnected();
  
    try {
      await this.producer!.send({
        topic,
        messages: [
          {
            key: key || undefined,
            value: JSON.stringify(message),
          },
        ],
      });
  
      logger.info(`📤 Message sent to topic: ${topic}`);
    } catch (error) {
      logger.error("❌ Kafka publish error:", { error });
  
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
      logger.info("🔌 Kafka Producer disconnected");

      this.producer = null;
    } catch (error) {
      logger.error("❌ Kafka disconnect error:", { error });

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