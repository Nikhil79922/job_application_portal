import { ResumeAnalyserResponse, CareerGuidanceResponse } from "@/types/utils/AIservice.types"

export interface CustomModalProps {
    open: boolean
  
    onOpenChange: (
      open: boolean
    ) => void
  
    title?: string
  
    description?: string
  
    children: React.ReactNode
  
    className?: string
  }

  export interface Resume_Analyser_Models_Props {
    open: boolean
  
    onOpenChange: (
      open: boolean
    ) => void
  
    response:
      ResumeAnalyserResponse | null
  }
  
export interface Career_Guidance_Models_Props {
    open: boolean
  
    onOpenChange: (
      open: boolean
    ) => void
  
    response:
      CareerGuidanceResponse | null
  }