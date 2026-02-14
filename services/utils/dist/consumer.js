import { Kafka } from 'kafkajs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const sendMailConsumer = async () => {
    try {
        const kafka = new Kafka({
            clientId: 'mail-service',
            brokers: [process.env.Kakfa_Broker || 'localhost:9092'],
        });
        const consumer = kafka.consumer({ groupId: 'test-group' });
        await consumer.connect();
        const topicName = 'send-mail';
        await consumer.subscribe({ topic: topicName, fromBeginning: false });
        console.log("✅ Mail service Kafka consumer is started , For Emails.");
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const { to, subject, html } = JSON.parse(message.value?.toString() || "{}");
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.GMAIL_USER,
                            pass: process.env.GMAIL_PASSWORD
                        }
                    });
                    await transporter.sendMail({
                        from: "HireHeaven <noreply>",
                        to,
                        subject,
                        html
                    });
                    console.log(`✅ Mail has been send to: ${to}`);
                }
                catch (error) {
                    console.log("❌ failed to send the mail", error);
                }
            },
        });
    }
    catch (error) {
        console.log("❌ Kafka Consumer failed", error);
    }
};
