import { Request, Response, NextFunction } from "express";


const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

    // 🔥 ZOD VALIDATION ERRORS
    if (err?.name === "ZodError") {
      console.log(err)
      return res.status(400).json({
        success: false,
        message: err.issues.map((e: { message: any; }) => e.message).join(", "),
      });
    }
  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorMiddleware;
