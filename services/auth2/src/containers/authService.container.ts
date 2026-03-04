
// Infra
import { KafkaAdmin } from "../infra/messaging/kafka.admin.js";
import { KafkaProducer } from "../infra/messaging/kafka.producer.js";
import { RedisCacheService } from "../infra/cache/redis.client.js";
import { upload } from "../infra/storage/fileUpload.js";

// Repositories
import { PostgresUserRepository } from "../infra/database/repository/user.repository.js";
import { RefreshTokenTable } from "../infra/database/repository/refreshToken.repository.js";

// Services
import { BcryptPasswordService } from "../infra/security/password.service.js";
import { JwtTokenService } from "../infra/security/token.service.js";
// import { DeviceService } from "./domain/services/device.service.js";
import { Auth } from "../domain/services/auth.service.js";

const kafkaAdmin = new KafkaAdmin();
await kafkaAdmin.connect();

const kafkaProducer = new KafkaProducer();
await kafkaProducer.connect();

const cacheService = new RedisCacheService();
await cacheService.connect();

const fileUpload = new upload()

const userRepo = new PostgresUserRepository();
const refreshRepo = new RefreshTokenTable();

const passwordService = new BcryptPasswordService();
const tokenService = new JwtTokenService();
// const deviceService = new DeviceService();

export const authService = new Auth(
  userRepo,
  refreshRepo,
  passwordService,
  tokenService,
  cacheService,
  kafkaProducer,
  fileUpload
);