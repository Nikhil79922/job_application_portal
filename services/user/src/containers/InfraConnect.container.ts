
// Infra
import { KafkaAdmin } from "../infra/messaging/kafka.admin.js";
import { KafkaProducer } from "../infra/messaging/kafka.producer.js";
import { RedisCacheService } from "../infra/cache/redis.client.js";


const kafkaAdmin = new KafkaAdmin();
await kafkaAdmin.connect();

const kafkaProducer = new KafkaProducer();
await kafkaProducer.connect();

const cacheService = new RedisCacheService();
await cacheService.connect();