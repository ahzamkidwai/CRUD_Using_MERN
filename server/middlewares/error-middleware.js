const errorMiddleware = async (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Backend Error";
  const extraDetails = err.extraDetails || "Error from Backend";

  return res.status(statusCode).json({
    success: false,
    message,
    extraDetails,
  });
};

module.exports = errorMiddleware;
