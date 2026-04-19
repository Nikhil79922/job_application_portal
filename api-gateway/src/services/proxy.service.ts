export  const proxyRequest = async (req: any, target: string, breaker: any) => {
    try {
      const data = await breaker.fire({
        method: req.method,
        url: `${target}${req.url}`,
        data: req.body,
        headers: {
          ...req.headers,
        },
        transformRequest: [(data: any) => data],
      });
  
      return {
        status: 200,
        data,
      };
  
    } catch (error: any) {
      req.log.error(error);
  
      return {
        status: error.response?.status || 500,
        data: error.response?.data || {
          success: false,
          message: "Service unavailable",
        },
      };
    }
  };