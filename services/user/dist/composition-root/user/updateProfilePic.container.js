import { updateProfilePic } from '../../domain/services/user/updateProfilePic.service.js';
import { PostgresUserRepository } from '../../infra/database/repository/user.repository.js';
import { KafkaProducer } from '../../infra/messaging/kafka.producer.js';
const userRepo = new PostgresUserRepository();
const kafkaUploadFile = new KafkaProducer();
export const updateProfilePics = new updateProfilePic(userRepo, kafkaUploadFile);
