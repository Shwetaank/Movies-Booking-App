const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API 🎬",
      version: "1.0.0",
      description: `
        **Movie API** is a comprehensive tool designed for managing movie data. 🛠️ 
        With this API, you can perform operations such as adding, updating, and retrieving movies efficiently. 
        📊 Whether you're building a movie-related application or integrating movie data into your system, this API provides a robust solution.
        
        **Features**:
        - Add new movies 📅
        - Update existing movie details ✏️
        - Retrieve movie information 📖
        - Book tickets for movies 🎟️

        **Tailored for developers** who need a reliable and efficient way to manage movie data. 
        Get started quickly with our easy-to-use endpoints and comprehensive documentation. 📚
      `,
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
