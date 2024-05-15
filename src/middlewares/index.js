export const responseMiddleware = () => (req, res, next) => {
  res.successResponse = ({ statusCode = 200, message, data }) => {
    res.status(statusCode).json({
      success: true,
      ...(message && { message }),
      ...(data && { data }),
    });
  };

  res.errorResponse = ({ statusCode = 400, message, data }) => {
    res.status(statusCode).json({
      success: false,
      ...(message && { message }),
      ...(data && { data }),
    });
  };

  next();
};
