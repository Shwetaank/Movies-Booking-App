import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Movies-Mania API",
      version: "1.0.0",
      description: "A comprehensive API for managing movies and bookings in the Movies-Mania application. This API provides CRUD operations for movies, including adding, updating, retrieving, and deleting movies. It also includes functionality for managing bookings, including creating and retrieving bookings.",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server for local testing",
      },
    ],
    components: {
      schemas: {
        Movie: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier for the movie",
            },
            title: {
              type: "string",
              description: "Title of the movie",
            },
            genre: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Array of genres associated with the movie",
            },
            releaseDate: {
              type: "string",
              format: "date",
              description: "Release date of the movie",
            },
            duration: {
              type: "integer",
              description: "Duration of the movie in minutes",
            },
            director: {
              type: "string",
              description: "Director of the movie",
            },
            cast: {
              type: "array",
              items: {
                type: "string",
              },
              description: "List of cast members",
            },
            posterUrl: {
              type: "string",
              description: "URL of the movie poster",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the movie was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the movie was last updated",
            },
          },
        },
        Seat: {
          type: "object",
          properties: {
            seatNumber: {
              type: "string",
              description: "The seat number in the cinema",
            },
            isBooked: {
              type: "boolean",
              description: "Indicates whether the seat is booked or not",
            },
          },
        },
        Booking: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier for the booking",
            },
            movie: {
              type: "string",
              description: "The title of the movie for which the booking is made",
            },
            seats: {
              type: "array",
              items: {
                $ref: '#/components/schemas/Seat',
              },
              description: "An array of seat objects indicating seat numbers and their booking status",
            },
            slot: {
              type: "string",
              description: "The time slot for the movie showing (e.g., Morning, Afternoon, Evening, Night)",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the booking was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the booking was last updated",
            },
            bookedSeatsCount: {
              type: "integer",
              description: "Number of booked seats in the booking",
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: "Bad request - missing required fields or invalid data",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        msg: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        InternalServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Server Error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
