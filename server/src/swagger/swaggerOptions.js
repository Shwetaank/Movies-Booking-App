import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Movies-Mania API",
      version: "1.0.0",
      description: "Movies",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // files containing routes and swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
