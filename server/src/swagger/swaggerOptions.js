const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
      description:
        "🎬 **Movie API**: A comprehensive API designed for managing movie data. 🛠️ Perform operations such as adding, updating, and retrieving movies efficiently. 📊 Tailored for developers building movie-related applications.",
      contact: {
        name: "Sin_Greed",
        email: "spmorey87@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server 🌱",
      },
      {
        url: "https://api.example.com",
        description: "Production server 🚀",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};

export default swaggerOptions;
