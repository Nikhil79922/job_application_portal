import logger from "../config/logger.js";

export async function initApp() {
    logger.info("🚀 Initializing composition root...");

    await import("./helper/InfraConnect.container.js");
    await import("./helper/rateLimiting.container.js");
  
    await import("./auth/login.container.js");
    await import("./auth/logout.container.js");
    await import("./auth/refreshToken.container.js");
    await import("./auth/register.container.js");
    await import("./auth/reset.container.js");
    
    logger.info("✅ All containers initialized");
  }