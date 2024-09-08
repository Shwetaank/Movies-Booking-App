const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
      description: "API for managing movies",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerOptions;
