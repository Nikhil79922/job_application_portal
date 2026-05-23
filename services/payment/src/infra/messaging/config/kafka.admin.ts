import { Admin } from "kafkajs";
import { kafka } from "../../../config/kafka.config.js";

export class KafkaAdmin {
  private admin: Admin | null = null;
  private connecting: Promise<void> | null = null;
  private readonly SEND_MAIL_TOPIC = "send-mail";
  private readonly UPLOAD_CONTENT_TOPIC = "upload-content";

  async connect(): Promise<void> {
    if (this.admin) return;
    if (this.connecting) return this.connecting;
    this.connecting = (async () => {
      try {
        const admin = kafka.admin();
       await admin.connect();
        console.log("✅ Kafka Admin connected");

        await admin.createTopics({
          topics: [
            {
              topic: this.SEND_MAIL_TOPIC,
              numPartitions: 1,
              replicationFactor: 1,
            },
            {
              topic: this.UPLOAD_CONTENT_TOPIC,
              numPartitions: 2,
              replicationFactor: 1,
            },
          ],
          waitForLeaders: true,
        });

        console.log("📌 Topics ensured:", [
          this.SEND_MAIL_TOPIC,
          this.UPLOAD_CONTENT_TOPIC,
        ]);

        this.admin = admin;
      } catch (error) {
        this.admin = null;
        throw new Error(
          "Kafka Admin connection failed. Service unavailable."
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
      throw new Error(
        "Kafka Admin disconnection failed."
      );
    }
  }

  getInstance(): Admin {
    if (!this.admin) {
      throw new Error(
        "Kafka Admin is not initialized. Call connect() first."
      );
    }

    return this.admin;
  }
}