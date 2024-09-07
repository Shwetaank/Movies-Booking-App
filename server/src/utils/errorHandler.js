export const errorHandler = (err, req, res, next) => {
  // Log the error (optional, useful for debugging)
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Only show stack trace in development mode
  });
};
