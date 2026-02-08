import {  Response } from "express";
 const sendResponse = (
    res: Response,
    statusCode: number,
    data?: any,
    message = "Success"
  ) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  export default sendResponse;