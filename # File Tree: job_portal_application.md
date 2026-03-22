# File Tree: job_portal_application

**Generated:** 22/03/2026, 18:24:39
**Root Path:** `/Users/apple/Documents/Nikhil Singh /job_portal_application`

```
├── 📁 frontend
│   ├── 📁 will_COME_soon
│   │   └── 📄 index.js
│   ├── 🖼️ dir_structure.svg
│   └── 🌐 index.html
├── 📁 services
│   ├── 📁 auth
│   │   ├── 📁 src
│   │   │   ├── 📁 api
│   │   │   │   ├── 📁 controllers
│   │   │   │   │   └── 📄 auth.controller.ts
│   │   │   │   ├── 📁 dtos
│   │   │   │   │   ├── 📄 authForgot.schema copy.ts
│   │   │   │   │   ├── 📄 authLogin.schema.ts
│   │   │   │   │   ├── 📄 authReset.schema copy.ts
│   │   │   │   │   └── 📄 authResgister.schema.ts
│   │   │   │   └── 📁 routes
│   │   │   │       └── 📄 auth.routes.ts
│   │   │   ├── 📁 composition-root
│   │   │   │   ├── 📁 auth
│   │   │   │   │   ├── 📄 forgotPassword.container.ts
│   │   │   │   │   ├── 📄 login.container.ts
│   │   │   │   │   ├── 📄 logout.container.ts
│   │   │   │   │   ├── 📄 refreshToken.container.ts
│   │   │   │   │   ├── 📄 register.container.ts
│   │   │   │   │   └── 📄 reset.container.ts
│   │   │   │   ├── 📄 InfraConnect.container.ts
│   │   │   │   └── 📄 rateLimiting.container.ts
│   │   │   ├── 📁 config
│   │   │   │   ├── 📄 database.config.ts
│   │   │   │   ├── 📄 env.ts
│   │   │   │   ├── 📄 kafka.config.ts
│   │   │   │   ├── 📄 multer.config.ts
│   │   │   │   └── 📄 redis.config.ts
│   │   │   ├── 📁 domain
│   │   │   │   ├── 📁 entities
│   │   │   │   │   └── 📄 auth-user.entity.ts
│   │   │   │   ├── 📁 interfaces
│   │   │   │   │   ├── 📄 cache.interface.ts
│   │   │   │   │   ├── 📄 deviceInfo.interface.ts
│   │   │   │   │   ├── 📄 message-broker.interface.ts
│   │   │   │   │   ├── 📄 password.service.interface.ts
│   │   │   │   │   ├── 📄 refreshToken.repository.interface.ts
│   │   │   │   │   ├── 📄 token.service.interface.ts
│   │   │   │   │   ├── 📄 uploadFile.interface.ts
│   │   │   │   │   └── 📄 user.repository.interface.ts
│   │   │   │   └── 📁 services
│   │   │   │       ├── 📁 auth
│   │   │   │       │   ├── 📄 forgotPassword.service.ts
│   │   │   │       │   ├── 📄 login.servcie.ts
│   │   │   │       │   ├── 📄 logout.service.ts
│   │   │   │       │   ├── 📄 refreshToken.service.ts
│   │   │   │       │   ├── 📄 register.service.ts
│   │   │   │       │   └── 📄 resetPassword.service.ts
│   │   │   │       └── 📁 helpers
│   │   │   │           ├── 📄 device.service.ts
│   │   │   │           └── 📄 rateLimit.service.ts
│   │   │   ├── 📁 infra
│   │   │   │   ├── 📁 database
│   │   │   │   │   ├── 📁 models
│   │   │   │   │   │   ├── 📄 refreshToken.model.ts
│   │   │   │   │   │   ├── 📄 skill.model.ts
│   │   │   │   │   │   ├── 📄 user.model.ts
│   │   │   │   │   │   └── 📄 userSkills.model.ts
│   │   │   │   │   └── 📁 repository
│   │   │   │   │       ├── 📄 refreshToken.repository.ts
│   │   │   │   │       ├── 📄 skill.repository.ts
│   │   │   │   │       ├── 📄 user.repository.ts
│   │   │   │   │       └── 📄 userSkills.repository.ts
│   │   │   │   ├── 📁 http
│   │   │   │   │   └── 📄 cookies.ts
│   │   │   │   ├── 📁 messaging
│   │   │   │   │   ├── 📄 kafka.admin.ts
│   │   │   │   │   └── 📄 kafka.producer.ts
│   │   │   │   ├── 📁 security
│   │   │   │   │   ├── 📄 password.service.ts
│   │   │   │   │   └── 📄 token.service.ts
│   │   │   │   └── 📁 storage
│   │   │   │       └── 📄 fileUpload.ts
│   │   │   ├── 📁 shared
│   │   │   │   ├── 📁 constants
│   │   │   │   │   ├── 📄 successRes.ts
│   │   │   │   │   └── 📄 tryCatch.ts
│   │   │   │   ├── 📁 errors
│   │   │   │   │   └── 📄 AppError.ts
│   │   │   │   ├── 📁 job
│   │   │   │   │   └── 📄 refreshTokenCleanUp.cronJob.ts
│   │   │   │   ├── 📁 middleware
│   │   │   │   │   ├── 📄 device.middleware.ts
│   │   │   │   │   ├── 📄 error.middleware.ts
│   │   │   │   │   └── 📄 logger.middleware.ts
│   │   │   │   ├── 📁 types
│   │   │   │   │   └── 📄 express.d.ts
│   │   │   │   └── 📁 utils
│   │   │   │       ├── 📄 buffer.ts
│   │   │   │       ├── 📄 emailTemplate.ts
│   │   │   │       └── 📄 reqUserAgent.entity.ts
│   │   │   ├── 📄 app.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📝 directory.MD
│   │   ├── ⚙️ package-lock.json
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   ├── 📁 user
│   │   ├── 📁 src
│   │   │   ├── 📁 api
│   │   │   │   ├── 📁 controllers
│   │   │   │   │   └── 📄 user.controller.ts
│   │   │   │   ├── 📁 dtos
│   │   │   │   │   ├── 📄 updateProfilePic.schema.ts
│   │   │   │   │   ├── 📄 updateResume.schema.ts
│   │   │   │   │   └── 📄 updateUserProfile.schema.ts
│   │   │   │   └── 📁 routes
│   │   │   │       └── 📄 user.routes.ts
│   │   │   ├── 📁 composition-root
│   │   │   │   ├── 📁 user
│   │   │   │   │   ├── 📄 getUserProfile.container.ts
│   │   │   │   │   ├── 📄 updateProfilePic.container.ts
│   │   │   │   │   ├── 📄 updateResume.container.ts
│   │   │   │   │   └── 📄 updateUserProfile.container.ts
│   │   │   │   ├── 📄 InfraConnect.container.ts
│   │   │   │   └── 📄 rateLimiting.container.ts
│   │   │   ├── 📁 config
│   │   │   │   ├── 📄 database.config.ts
│   │   │   │   ├── 📄 env.ts
│   │   │   │   ├── 📄 kafka.config.ts
│   │   │   │   ├── 📄 multer.config.ts
│   │   │   │   └── 📄 redis.config.ts
│   │   │   ├── 📁 domain
│   │   │   │   ├── 📁 entities
│   │   │   │   │   └── 📄 user.entity.ts
│   │   │   │   ├── 📁 interfaces
│   │   │   │   │   ├── 📄 cache.interface.ts
│   │   │   │   │   ├── 📄 deviceInfo.interface.ts
│   │   │   │   │   ├── 📄 message-broker.interface.ts
│   │   │   │   │   ├── 📄 password.service.interface.ts
│   │   │   │   │   ├── 📄 refreshToken.interface.ts
│   │   │   │   │   ├── 📄 token.service.interface.ts
│   │   │   │   │   ├── 📄 uploadFile.interface.ts
│   │   │   │   │   └── 📄 user.repository.interface.ts
│   │   │   │   └── 📁 services
│   │   │   │       ├── 📁 helpers
│   │   │   │       │   ├── 📄 device.service.ts
│   │   │   │       │   └── 📄 rateLimit.service.ts
│   │   │   │       └── 📁 user
│   │   │   │           ├── 📄 getUserProfile.service.ts
│   │   │   │           ├── 📄 updateProfilePic.service.ts
│   │   │   │           ├── 📄 updateResume.service.ts
│   │   │   │           └── 📄 updateUserProfile.service.ts
│   │   │   ├── 📁 infra
│   │   │   │   ├── 📁 database
│   │   │   │   │   ├── 📁 models
│   │   │   │   │   │   ├── 📄 refreshToken.model.ts
│   │   │   │   │   │   ├── 📄 skill.model.ts
│   │   │   │   │   │   ├── 📄 user.model.ts
│   │   │   │   │   │   └── 📄 userSkills.model.ts
│   │   │   │   │   └── 📁 repository
│   │   │   │   │       ├── 📄 refreshToken.repository.ts
│   │   │   │   │       ├── 📄 skill.repository.ts
│   │   │   │   │       ├── 📄 user.repository.ts
│   │   │   │   │       └── 📄 userSkills.repository.ts
│   │   │   │   ├── 📁 http
│   │   │   │   │   └── 📄 cookies.ts
│   │   │   │   ├── 📁 messaging
│   │   │   │   │   ├── 📄 kafka.admin.ts
│   │   │   │   │   └── 📄 kafka.producer.ts
│   │   │   │   ├── 📁 security
│   │   │   │   │   ├── 📄 password.service.ts
│   │   │   │   │   └── 📄 token.service.ts
│   │   │   │   └── 📁 storage
│   │   │   │       └── 📄 fileUpload.ts
│   │   │   ├── 📁 shared
│   │   │   │   ├── 📁 constants
│   │   │   │   │   ├── 📄 successRes.ts
│   │   │   │   │   └── 📄 tryCatch.ts
│   │   │   │   ├── 📁 errors
│   │   │   │   │   └── 📄 AppError.ts
│   │   │   │   ├── 📁 job
│   │   │   │   │   └── 📄 refreshTokenCleanUp.cronJob.ts
│   │   │   │   ├── 📁 middleware
│   │   │   │   │   ├── 📄 device.middleware.ts
│   │   │   │   │   ├── 📄 error.middleware.ts
│   │   │   │   │   ├── 📄 logger.middleware.ts
│   │   │   │   │   └── 📄 verifyToken.middleware.ts
│   │   │   │   ├── 📁 types
│   │   │   │   │   ├── 📄 express.d.ts
│   │   │   │   │   └── 📄 user.type.ts
│   │   │   │   └── 📁 utils
│   │   │   │       ├── 📄 buffer.ts
│   │   │   │       ├── 📄 emailTemplate.ts
│   │   │   │       └── 📄 reqUserAgent.entity.ts
│   │   │   ├── 📄 app.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📝 directory.MD
│   │   ├── ⚙️ package-lock.json
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   └── 📁 utils
│       ├── 📁 src
│       │   ├── 📄 consumer.ts
│       │   ├── 📄 index.ts
│       │   └── 📄 routes.ts
│       ├── ⚙️ package-lock.json
│       ├── ⚙️ package.json
│       └── ⚙️ tsconfig.json
└── ⚙️ .gitignore
```

---
*Generated by FileTree Pro Extension*