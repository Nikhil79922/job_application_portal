
// Infra
import { KafkaProducer } from "../../infra/messaging/kafka.producer.js";
import { RedisCacheService } from "../../infra/cache/redis.client.js";

// Services
import { JwtTokenService } from "../../infra/security/token.service.js";

// Repositories
import { PostgresUserRepository } from "../../infra/database/repository/user.repository.js";
import { authForgotPassword } from "../../domain/services/auth/forgotPassword.service.js";

const KafkaProd = new KafkaProducer();
const cacheService = new RedisCacheService();

const userRepo = new PostgresUserRepository();

const tokenService = new JwtTokenService();
// const deviceService = new DeviceService();

export const authForgotPasswordService = new authForgotPassword(
  userRepo,
  tokenService,
  cacheService,
  KafkaProd,
);