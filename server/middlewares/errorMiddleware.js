export const errorMiddleware = (err, req, res, next) => {
    // Default values set karna
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Response bhejna
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};