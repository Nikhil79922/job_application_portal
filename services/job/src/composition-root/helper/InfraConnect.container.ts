
// Infra
import { KafkaProducer } from "../../infra/messaging/kafka.producer.js";
import { RedisCacheService } from "../../infra/cache/redis.client.js";

const kafkaProducer = new KafkaProducer();
await kafkaProducer.connect();

const cacheService = new RedisCacheService();
await cacheService.connect();