import { Request, Response } from "express";
import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { AuthenticatedRequest } from "../../shared/types/user.type.js";
import AppError from "../../shared/errors/AppError.js";
import { createJobSchema } from "../dtos/job/createJob.schema.js";
import { createJobService } from "../../composition-root/job/createJob.container.js";
import { updateJobSchema } from "../dtos/job/updateJob.schema.js";
import { updateJobService } from "../../composition-root/job/updateJob.container.js";
import { getAllActiveJobService } from "../../composition-root/job/getAllActiveJob.container.js";
import { getJobDetailsService } from "../../composition-root/job/getJobDetails.container.js";
import { getAllApplicationForJobService } from "../../composition-root/job/getAllApplicationForJob.container.js";

// Helper function
const getClientIP = (req: Request) =>
  (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
  req.ip ||
  "unknown";

// Route Controller
export const createJobController = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'recruiter') {
    throw new AppError("Only recruiter can create a job", 403);
  }

  const dto = createJobSchema.parse(req.body)

  const resData = await createJobService.createJob(dto ,userData)

    sendResponse(res, 200, "Job created successfully", resData);
});

export const udpateJobController = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'recruiter') {
    throw new AppError("Only recruiter can update a job", 403);
  }

  const dto = updateJobSchema.parse(req.body)

  const resData = await updateJobService.updateJob(dto ,userData)

    sendResponse(res, 200, "Job updated successfully", resData);
});

export const getAllActiveJobController = TryCatch(async (req: Request, res: Response) => {

  const { title, location } = req.query;

  const filters: {
    title?: string;
    location?: string;
  } = {};

  if (title && typeof title === "string") {
    filters.title = title.trim();
  }

  if (location && typeof location === "string") {
    filters.location = location.trim();
  }
  const resData = await getAllActiveJobService.getAllActiveJobs(filters);

    sendResponse(res, 200, resData?.message, resData?.data);
});

export const getJobController = TryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  
    if (!id || typeof id !== "string") {
      throw new AppError("Job ID is required", 400);
    }

    if (!/^\d+$/.test(id)) {
      throw new AppError("Job ID must be a valid number", 400);
    }

    const jobId = Number(id);

    if (!Number.isInteger(jobId) || jobId <= 0) {
      throw new AppError("Job ID must be a positive integer", 400);
    }

    if (jobId > 1_000_000_000) {
      throw new AppError("job ID too large", 400);
    }

  const resData = await getJobDetailsService.getJobsDetails(jobId);

    sendResponse(res, 200, resData?.message, resData?.data);
});

export const getAllApplicationForJobController = TryCatch(async (req: AuthenticatedRequest, res: Response) => {

  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'recruiter') {
    throw new AppError("Only recruiter can access this Route", 403);
  }

  const { id } = req.params;
  
  if (!id || typeof id !== "string") {
    throw new AppError("Job ID is required", 400);
  }

  if (!/^\d+$/.test(id)) {
    throw new AppError("Job ID must be a valid number", 400);
  }

  const jobId = Number(id);

  if (!Number.isInteger(jobId) || jobId <= 0) {
    throw new AppError("Job ID must be a positive integer", 400);
  }

  if (jobId > 1_000_000_000) {
    throw new AppError("job ID too large", 400);
  }

  const resData = await getAllApplicationForJobService.getAllApplication(jobId,userData);

    sendResponse(res, 200, resData?.message, resData?.data);
});