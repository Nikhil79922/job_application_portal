import CircuitBreaker from "opossum";
import axios from "axios";

type AxiosConfig = {
  method: string;
  url: string;
  data?: any;
  headers?: any;
};

async function axiosCall(config: AxiosConfig) {
    const response = await axios({
      ...config,
      validateStatus: () => true, // ✅ don't auto-throw
    });
    
    if (response.status >= 500) {
      throw new Error(`Server error: ${response.status}`);
    }
  
    return {
      status: response.status,
      data: response.data,
    };
  }
export function createBreaker(serviceName: string) {
  const breaker = new CircuitBreaker(axiosCall, {
    timeout: 9000, // fail if >5s
    errorThresholdPercentage: 50, // open if 50% fail
    resetTimeout: 15000, // retry after 10s
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

  // fallback response
  breaker.fallback(() => {
    return {
      success: false,
      message: `${serviceName} service unavailable`,
    };
  });

  return breaker;
}