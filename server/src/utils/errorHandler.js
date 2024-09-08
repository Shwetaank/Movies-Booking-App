// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
  // Set status code to 500 (Internal Server Error) if not specified
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set response status
  res.status(statusCode);

  // Send JSON response with error details
  res.json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });

  // Log the error details (can be expanded with a logging service)
  console.error(`Error: ${err.message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack); // Log stack trace in development
  }
};

export default errorHandler;
