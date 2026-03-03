import { Admin } from "kafkajs";
import { kafka } from "../../config/kafka.config.js";
import AppError from "../../shared/errors/AppError.js";

export class KafkaAdmin {
  private admin: Admin | null = null;
  private connecting: Promise<void> | null = null;
  private readonly SEND_MAIL_TOPIC = "send-mail";

  async connect(): Promise<void> {
    if (this.admin) return;
    if (this.connecting) return this.connecting;
    this.connecting = (async () => {
      try {
        const admin = kafka.admin();
        await admin.connect();

        const topics = await admin.listTopics();

        if (!topics.includes(this.SEND_MAIL_TOPIC)) {
          await admin.createTopics({
            topics: [
              {
                topic: this.SEND_MAIL_TOPIC,
                numPartitions: 1,
                replicationFactor: 1,
              },
            ],
          });
        }

        this.admin = admin;
      } catch (error) {
        this.admin = null;
        throw new AppError(
          "Kafka Admin connection failed. Service unavailable.",
          503
        );
      } finally {
        this.connecting = null;
      }
    })();

    return this.connecting;
  }

  async disconnect(): Promise<void> {
    if (!this.admin) return;

    try {
      await this.admin.disconnect();
      this.admin = null;
    } catch (error) {
      throw new AppError(
        "Kafka Admin disconnection failed.",
        500
      );
    }
  }

  getInstance(): Admin {
    if (!this.admin) {
      throw new AppError(
        "Kafka Admin is not initialized. Call connect() first.",
        503
      );
    }

    return this.admin;
  }
}