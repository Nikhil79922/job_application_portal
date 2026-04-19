import CircuitBreaker from "opossum";
import axios from "axios";

type AxiosConfig = {
  method: string;
  url: string;
  data?: any;
  headers?: any;
};

async function axiosCall(config: AxiosConfig & { meta?: any }) {
    const { meta, ...axiosConfig } = config; // 🔥 separate meta
  
    const start = meta?.startTime || Date.now();
  
    try {
      const response = await axios({
        ...axiosConfig,
        timeout: 8000,
        validateStatus: () => true,
      });
  
      const duration = Date.now() - start;
  
      if (response.status >= 500) {
        const err: any = new Error(`Server error: ${response.status}`);
        err.statusCode = response.status;
        err.meta = {
          ...meta, // 🔥 preserve logger
          url: config.url,
          duration,
          status: response.status,
        };
        throw err;
      }
  
      return {
        status: response.status,
        data: response.data,
        meta: {
          ...meta, // 🔥 preserve logger
          url: config.url,
          duration,
          status: response.status,
        },
      };
  
    } catch (err: any) {
      const duration = Date.now() - start;
  
      err.statusCode = err.response?.status || 500;
      err.meta = {
        ...meta, // 🔥 preserve logger
        url: config.url,
        duration,
        status: err.statusCode,
      };
  
      throw err;
    }
  }
  
export function createBreaker(serviceName: string) {
    const breaker = new CircuitBreaker(axiosCall, {
        timeout: 10000,
        errorThresholdPercentage: 50,
        resetTimeout: 8000,
        volumeThreshold: 10,
      
        errorFilter: (err: any) => {
          if (err.statusCode && err.statusCode < 500) {
            return true;
          }
          return false;
        },
      });

  // logs (important)
  breaker.on("open", () => {
    console.log(`🚨 ${serviceName} circuit OPEN`);
  });

  breaker.on("halfOpen", () => {
    console.log(`⚠️ ${serviceName} circuit HALF-OPEN`);
  });

  breaker.on("close", () => {
    console.log(`✅ ${serviceName} circuit CLOSED`);
  });

  breaker.on("success", (result: any) => {
    const log = result.meta?.logger;
  
    log?.info(
      {
        url: result.meta?.url,
        status: result.meta?.status,
        duration: result.meta?.duration,
      },
      "Breaker success"
    );
  });
  
  breaker.on("failure", (err: any) => {
    const log = err.meta?.logger;
  
    log?.error(
      {
        url: err.meta?.url,
        status: err.meta?.status,
        duration: err.meta?.duration,
        error: err.message,
      },
      "Breaker failure"
    );
  });
  
  breaker.on("reject", () => {
    console.log("❌ REJECT (OPEN STATE)");
  });

  // fallback response
  breaker.fallback(() => ({
    status: 503,
    data: {
      success: false,
      message: `${serviceName} service unavailable`,
    },
  }));

  return breaker;
}