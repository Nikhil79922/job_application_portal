import { updateResumeFile } from '../../domain/services/user/updateResume.service.js';
import { PostgresUserRepository } from '../../infra/database/repository/user.repository.js';
import { KafkaProducer } from '../../infra/messaging/kafka.producer.js';
import { upload } from '../../infra/storage/fileUpload.js';

const userRepo= new PostgresUserRepository()
const kafkaUploadFile=new KafkaProducer()
export const updateResumesService= new updateResumeFile(userRepo,kafkaUploadFile)