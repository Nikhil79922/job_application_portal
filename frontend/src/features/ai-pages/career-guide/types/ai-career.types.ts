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
