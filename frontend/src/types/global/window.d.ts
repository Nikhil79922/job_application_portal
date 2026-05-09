import {
    CareerGuidanceResponse,
    ResumeAnalyserResponse,
  } from "@/types/utils/AIservice.types"
  
  declare global {
  
    interface Window {
  
      __careerGuideResponse?:
        CareerGuidanceResponse
  
      __resumeAnalysisResponse?:
        ResumeAnalyserResponse
    }
  }
  
  export {}