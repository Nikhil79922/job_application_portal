const errorMiddleware = (err, req, res, next) => {
    // 🔥 ZOD VALIDATION ERRORS
    if (err?.name === "ZodError") {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: err.issues.map((e) => e.message).join(", "),
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
