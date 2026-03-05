src/
 ├── app.ts
 ├── server.ts
 ├──config/
         ├── env.ts
         ├── app.config.ts
         ├── database.config.ts
         ├── redis.config.ts
         ├── kafka.config.ts
         └── jwt.config.ts

 ├── api/
 │   ├── controllers/
 │   │    └── auth.controller.ts
 │   │
 │   ├── routes/
 │   │    └── auth.routes.ts
 │   │
 │   ├── dtos/
 │   │    ├── login.dto.ts
 │   │    ├── register.dto.ts
 │   │    ├── forgot.dto.ts
 │   │    └── reset.dto.ts
 │   │
 │   └── validators/
 │        └── auth.validator.ts

 ├── domain/
 │   ├── entities/
 │   │    ├── user.entity.ts
 │   │    └── refresh-token.entity.ts
 │   │
 │   ├── services/
 │   │    ├── auth.service.ts
 │   │    ├── password.service.ts
 │   │    ├── token.service.ts
 │   │    └── device.service.ts
 │   │
 │   ├── interfaces/
 │   │    ├── user.repository.interface.ts
 │   │    └── token.repository.interface.ts
 │   │
 │   └── events/   (optional for event-driven)
 │        └── user-registered.event.ts

 ├── infrastructure/
 │   ├── database/
 │   │    ├── repositories/
 │   │    │    ├── user.repository.ts
 │   │    │    └── refresh-token.repository.ts
 │   │    │
 │   │    └── prisma.client.ts  (or mongoose / knex)
 │   │
 │   ├── cache/
 │   │    └── redis.service.ts
 │   │
 │   ├── messaging/
 │   │    └── kafka.producer.ts
 │   │
 │   ├── storage/
 │   │    └── upload.service.ts
 │   │
 │   └── security/
 │        └── jwt.adapter.ts

 ├── shared/
 │   ├── errors/
 │   │    └── AppError.ts
 │   │
 │   ├── middleware/
 │   │    ├── error.middleware.ts
 │   │    ├── logger.middleware.ts
 │   │    └── auth.middleware.ts
 │   │
 │   ├── utils/
 │   │    ├── date.util.ts
 │   │    ├── string.util.ts
 │   │    ├── crypto.util.ts
 │   │    └── env.util.ts
 │   │
 │   ├── constants/
 │   │    └── auth.constants.ts
 │   │
 │   └── types/
 │        └── global.types.ts
 │
 └── tests/
     ├── unit/
     └── integration/