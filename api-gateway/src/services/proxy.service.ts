import http from "http";
import https from "https";

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 100,
  maxFreeSockets: 10,
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 100,
  maxFreeSockets: 10,
});

export const proxyRequest = async (req: any, target: string, breaker: any) => {
  try {
    let data;
    let headers: any = {};

    const contentType = req.headers["content-type"] || "";
    const isMultipart = contentType.includes("multipart/form-data");

    if (isMultipart) {
      data = req.raw
      headers = {
        ...req.headers,
      }
    } else {
      data = req.body
      headers = {
        "content-type":
          "application/json",
      }
    }

    if (req.headers.authorization) {
      headers.authorization = req.headers.authorization;
    }

    if (req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }

    if (req.headers["user-agent"]) {
      headers["user-agent"] =
        req.headers["user-agent"]
    }
    const response=await breaker.fire({
 
      method:req.method,

      url:`${target}${req.url}`,

      data,

      headers,

      httpAgent,
      httpsAgent,

      maxBodyLength:
        Infinity,

      maxContentLength:
        Infinity,

      responseType:
        "json",

      transitional:{
        forcedJSONParsing:
          false,
      },

      meta:{
        startTime:
          Date.now(),

        logger:
          req.log,
      },
    })

    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };

  } catch (error: any) {
    req.log.error(error);

    return {
      status: error.statusCode || 503,
      data: {
        success: false,
        message: "Service temporarily unavailable",
      },
    };
  }
};