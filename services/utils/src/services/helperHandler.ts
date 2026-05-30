import logger from "../config/logger.js";

export const handleAIError = (
    error: any,
    res: any
  ) => {
  
    logger.error("AI Service Error:", { error })
  
    // GEMINI RATE LIMIT
    if (
      error?.status === 429
    ) {
  
      return res.status(429).json({
        success: false,
  
        message:
          "AI service is currently experiencing high traffic. Please try again in a few moments.",
      })
    }
  
    // INVALID API KEY
    if (
      error?.status === 401
    ) {
  
      return res.status(500).json({
        success: false,
  
        message:
          "AI service configuration error.",
      })
    }
  
    // FALLBACK
    return res.status(500).json({
      success: false,
  
      message:
        "Unable to process AI request at the moment. Please try again later.",
    })
  }