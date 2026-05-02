export async function initApp() {
    console.log("🚀 Initializing user module...");
  
    await import("./helper/InfraConnect.container.js");
    await import("./helper/rateLimiting.container.js");
  
    await import("./user/getUserProfile.container.js");
    await import("./user/updateUserProfile.container.js");
    await import("./user/updateProfilePic.container.js");
    await import("./user/updateResume.container.js");
    await import("./user/addSkillsToUser.container.js");
    await import("./user/deleteSkillsToUser.container.js");
    await import("./user/appliedForJob.container.js");
    await import("./user/getAllJobApplications.container.js");
  
    console.log("✅ User module initialized");
  }