import {
    useQuery,
  } from "@tanstack/react-query"
  
  import {
    getApplicants,
  } from "../services/get-applicants"
  
  export const useApplicants = (
    jobId: number
  ) => {
  
    return useQuery({
      queryKey: [
        "job-applicants",
        jobId,
      ],
  
      queryFn: () =>
        getApplicants(jobId),
  
      enabled: !!jobId,
    })
  }