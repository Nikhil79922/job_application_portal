export interface CareerGuidanceResponse {
    summary: string
  
    jobOptions: JobOption[]
  
    skillsToLearn: SkillCategory[]
  
    learningApproach: LearningApproach
  }
  
  export interface JobOption {
    title: string
    responsibilities: string
    why: string
  }
  
  export interface SkillCategory {
    category: string
    skills: SkillToLearn[]
  }
  
  export interface SkillToLearn {
    title: string
    why: string
    how: string
  }
  
  export interface LearningApproach {
    title: string
    points: string[]
  }


  // Resume Analysers Types 

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