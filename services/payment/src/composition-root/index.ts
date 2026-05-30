import logger from "../config/logger.js";
export async function initApp() {
    logger.info("🚀 Initializing user module...");
  
    await import("./helper/InfraConnect.container.js");
    await import("./helper/rateLimiting.container.js");
  
    await import("./payment/checkoutSubscription.container.js");

  
    logger.info("✅ User module initialized");
  }