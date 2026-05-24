export async function initApp() {
    console.log("🚀 Initializing user module...");
  
    await import("./helper/InfraConnect.container.js");
    await import("./helper/rateLimiting.container.js");
  
    await import("./payment/checkoutSubscription.container.js");

  
    console.log("✅ User module initialized");
  }