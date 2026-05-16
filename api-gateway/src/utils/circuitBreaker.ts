import CircuitBreaker from "opossum";
import axios from "axios";

type AxiosConfig = {
  method: string;
  url: string;
  data?: any;
  headers?: any;
};

async function axiosCall(
  config:AxiosConfig & {
    meta?:any
  }
){

  const {
    meta,
    ...requestConfig
  }=config

  const start=
    meta?.startTime||
    Date.now()

  try{

    const isMultipart=
      requestConfig.headers?.[
        "content-type"
      ]?.includes(
        "multipart/form-data"
      )

    const response=
      await fetch(
        requestConfig.url,
        {
          method:
            requestConfig.method,

          headers:
            requestConfig.headers,

          body:
            isMultipart
              ? requestConfig.data
              : JSON.stringify(
                  requestConfig.data
                ),

          duplex:
            "half",
        } as any
      )

    const data=
      await response.json()

    const duration=
      Date.now()-start

    if(response.status>=500){

      const err:any=
        new Error(
          `Server error: ${response.status}`
        )

      err.statusCode=
        response.status

      err.meta={
        ...meta,
        url:
          requestConfig.url,
        duration,
        status:
          response.status,
      }

      throw err
    }

    return{
      status:
        response.status,

      data,

      headers:
        Object.fromEntries(
          response.headers.entries()
        ),

      meta:{
        ...meta,
        url:
          requestConfig.url,
        duration,
        status:
          response.status,
      },
    }

  }catch(err:any){

    const duration=
      Date.now()-start

    err.statusCode=
      err.statusCode||500

    err.meta={
      ...meta,
      url:
        requestConfig.url,
      duration,
      status:
        err.statusCode,
    }

    throw err
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
      message: `${serviceName} service temporarily unavailable`,
    },
  }));

  return breaker;
}