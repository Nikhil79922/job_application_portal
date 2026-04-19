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
      data = req.raw;
      headers["content-type"] = contentType;
    } else {
      data = req.body;
      headers["content-type"] = "application/json";
    }

    if (req.headers.authorization) {
      headers.authorization = req.headers.authorization;
    }

    if (req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }
    const response = await breaker.fire({
      method: req.method,
      url: `${target}${req.url}`,
      data,
      meta: {
        startTime: Date.now(),
        logger: req.log,
      },
      headers,
      httpAgent,
      httpsAgent,
    });

    return {
      status: response.status,
      data: response.data,
    };

  } catch (error: any) {
    req.log.error(error);

    return {
      status: error.statusCode || 500,
      data: {
        success: false,
        message: "Service unavailable",
      },
    };
  }
};