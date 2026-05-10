
  export interface ResumeAnalyserResponse {
    atsScore: number
  
    scoreBreakdown: {
      formatting: ScoreCategory
      keywords: ScoreCategory
      structure: ScoreCategory
      readability: ScoreCategory
    }
  
    suggestions: ResumeSuggestion[]
  
    strengths: string[]
  
    summary: string
  }
  
  export interface ScoreCategory {
    score: number
    feedback: string
  }
  
  export interface ResumeSuggestion {
    category: string
    issue: string
    recommendation: string
    priority:
      | "high"
      | "medium"
      | "low"
  }