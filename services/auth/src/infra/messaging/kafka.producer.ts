import { Producer } from "kafkajs";
import { kafka } from "../../config/kafka.config.js";
import AppError from "../../shared/errors/AppError.js";
import { IMessageBroker } from "../../domain/interfaces/message-broker.interface.js";

export class KafkaProducer implements IMessageBroker{
  private producer: Producer | null = null;
  private connecting: Promise<void> | null = null;

  async connect(): Promise<void> {

    if (this.producer) return;

    if (this.connecting) return this.connecting;

    this.connecting = (async () => {
      try {
        const producer = kafka.producer();
        await producer.connect();
        this.producer = producer;
      } catch (error) {
        this.producer = null;

        throw new AppError(
          "Kafka Producer connection failed. Service unavailable.",
          503
        );
      } finally {
        this.connecting = null;
      }
    })();

    return this.connecting;
  }

  async publish<T>(topic: string, message: T): Promise<void> {
    if (!this.producer) {
      throw new AppError(
        "Kafka Producer is not initialized. Call connect() first.",
        503
      );
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
    } catch (error) {
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
      this.producer = null;
    } catch (error) {
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