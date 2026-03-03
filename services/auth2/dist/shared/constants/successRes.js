const sendResponse = (res, statusCode, message = "Success", data) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
export default sendResponse;
