import swaggerJsdoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";

import { env } from "./env.js";

const options: Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Linkora URL Shortener API",
      version: "1.0.0",

      description:
        "REST API for creating, managing, tracking and resolving short URLs.",

      contact: {
        name: "API Support",
      },
    },

    servers: [
      {
        url: env.BACKEND_URL,
        description:
          env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],

    tags: [
      {
        name: "Health",
        description: "Application health monitoring",
      },
      {
        name: "URLs",
        description: "Short URL management",
      },
      {
        name: "Redirect",
        description: "Short URL redirection",
      },
    ],

    components: {
      schemas: {
        Url: {
          type: "object",

          properties: {
            _id: {
              type: "string",
              example: "68c94f24d18...",
            },

            originalUrl: {
              type: "string",
              format: "uri",
              example: "https://www.google.com",
            },

            shortCode: {
              type: "string",
              example: "DDFNH6v",
            },

            shortUrl: {
              type: "string",
              example:
                `${env.BACKEND_URL}/DDFNH6v`,
            },

            clickCount: {
              type: "integer",
              example: 5,
            },

            expiresAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },

            isActive: {
              type: "boolean",
              example: true,
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateUrlRequest: {
          type: "object",

          required: [
            "originalUrl",
          ],

          properties: {
            originalUrl: {
              type: "string",
              format: "uri",
              example:
                "https://www.google.com",
            },

            expiresAt: {
              type: "string",
              format: "date-time",
              nullable: true,
              example:
                "2026-12-31T23:59:59.000Z",
            },
          },
        },

        SuccessResponse: {
          type: "object",

          properties: {
            success: {
              type: "boolean",
              example: true,
            },

            message: {
              type: "string",
              example:
                "Operation completed successfully",
            },
          },
        },

        ErrorResponse: {
          type: "object",

          properties: {
            success: {
              type: "boolean",
              example: false,
            },

            message: {
              type: "string",
              example: "Resource not found",
            },
          },
        },
      },
    },
  },

  apis: [
    "./src/routes/*.ts",
    "./src/docs/swagger/*.ts",
  ],
};

export const swaggerSpec =
  swaggerJsdoc(options);