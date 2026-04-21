import { Request, Response } from "express";
import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { AuthenticatedRequest } from "../../shared/types/user.type.js";
import AppError from "../../shared/errors/AppError.js";
import { createCompanySchema } from "../dtos/company/createCompany.schema.js";
import { createCompanyService } from "../../composition-root/company/createCompany.container.js";
import { deleteCompanySchema } from "../dtos/company/deleteCompany.schema.js";
import { deleteCompanyService } from "../../composition-root/company/deleteCompany.container.js";
import { getAllCompaniesService } from "../../composition-root/company/getAllCompany.container.js";
import { getCompanyDeatilService } from "../../composition-root/company/getCompanyDeatils.container.js";

// Helper function
const getClientIP = (req: Request) =>
  (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
  req.ip ||
  "unknown";

// Route Controller
export const createCompanyController = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'recruiter') {
    throw new AppError("Only recruiter can create a company", 403);
  }

  const dto = createCompanySchema.parse({
    ...req.body,
    file: req.file,
  })
let body={
  ...req.body
}
  const resData = await createCompanyService.createCompany({body ,file:dto.file as Express.Multer.File}  ,userData)

    sendResponse(res, 200, "Company created successfully", resData);
});

export const deleteCompanyController = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'recruiter') {
    throw new AppError("Only recruiter can delete a company", 403);
  }

  const dto = deleteCompanySchema.parse({
    ...req.body
  })

  const resData = await deleteCompanyService.deleteCompany(dto ,userData)

    sendResponse(res, 200, resData?.message);
});

export const getAllCompanyController = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'recruiter') {
    throw new AppError("Only recruiter can find companies", 403);
  }

  const resData = await getAllCompaniesService.getAllCompany(userData)

    sendResponse(res, 200, resData?.message, resData?.allCompanies);
});

export const getCompanyDetailsController = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'recruiter') {
    throw new AppError("Only recruiter can find companies", 403);
  }

  const { id } = req.params;
  
    if (!id || typeof id !== "string") {
      throw new AppError("Company ID is required", 400);
    }

    if (!/^\d+$/.test(id)) {
      throw new AppError("Company ID must be a valid number", 400);
    }

    const companyId = Number(id);

    if (!Number.isInteger(companyId) || companyId <= 0) {
      throw new AppError("Company ID must be a positive integer", 400);
    }

    if (companyId > 1_000_000_000) {
      throw new AppError("Company ID too large", 400);
    }

  const resData = await getCompanyDeatilService.getCompanyDetail(Number(companyId))

    sendResponse(res, 200, resData?.message, resData?.companyDetails);
});
