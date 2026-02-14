import { kafka, } from "./client.js";
export const connectAdmin = async () => {
    try {
        const admin = kafka.admin();
        await admin.connect();
        console.log("✅ Kafka Admin connected...");
        const topics = await admin.listTopics();
        if (!topics.includes('send-mail')) {
            await admin.createTopics({
                topics: [{
                        topic: 'send-mail',
                        numPartitions: 1,
                        replicationFactor: 1,
                    }]
            });
            console.log("✅ Kafka Topic created");
        }
        await admin.disconnect();
    }
    catch (error) {
        console.log("❌ Kafka Admin failed", error);
    }
};
