// composition-root/index.ts
export async function initApp() {
    console.log("🚀 Initializing composition root...");
  
    await import("./helper/InfraConnect.container.js");
    await import("./helper/rateLimiting.container.js");
  
    await import("./company/createCompany.container.js");
    await import("./company/getAllCompany.container.js");
    await import("./company/getCompanyDeatils.container.js");
    await import("./company/deleteCompany.container.js");
  
    await import("./job/createJob.container.js");
    await import("./job/updateJob.container.js");
    await import("./job/getAllActiveJob.container.js");
    await import("./job/getJobDetails.container.js");
    await import("./job/getAllApplicationForJob.container.js");
    await import("./job/updateApplication.container.js");
  
    console.log("✅ All containers initialized");
  }