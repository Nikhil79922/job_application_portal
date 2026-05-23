import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { kafka } from '../../../config/kafka.config.js';

dotenv.config();

export const sendMailConsumer = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    });

    const consumer = kafka.consumer({ groupId: 'mail-service-group' });

    await consumer.connect();

    await consumer.subscribe({
      topic: 'send-mail',
      fromBeginning: false
    });

    console.log("✅ Mail consumer started");

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          let payload;

          try {
            payload = JSON.parse(message.value?.toString() || "{}");
          } catch {
            console.log("❌ Invalid JSON message");
            return;
          }

          if (!payload.to || !payload.subject) {
            console.log("⚠️ Invalid message skipped");
            return;
          }

          await transporter.sendMail({
            from: "TalentForge <noreply>",
            to: payload.to,
            subject: payload.subject,
            html: payload.html
          });

          console.log(`✅ Mail sent to: ${payload.to}`);

        } catch (error: any) {
          console.error("❌ Mail processing failed:", error.message);
        }
      },
    });

  } catch (error) {
    console.error("❌ Kafka Consumer failed", error);
  }
};