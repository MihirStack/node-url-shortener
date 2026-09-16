import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino";
import { pinoHttp } from "pino-http";

import { env } from "./config/env.js";

import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();
const logger = pino(
  env.NODE_ENV === "development"
    ? {
        transport: {
          target: "pino-pretty",
        },
      }
    : undefined
);

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(
  pinoHttp({
    logger,
  })
);

app.get(
  "/api/v1/health",
  (_req, res) => {
    res.status(200).json({
      success: true,
      message: "URL Shortener API is running",
    });
  }
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,

    customSiteTitle:
      "Linkora API Documentation",

    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
    },
  })
);

app.get(
  "/api-docs.json",
  (_req, res) => {
    res.status(200).json(swaggerSpec);
  }
);

app.use(
  "/api/v1/urls",
  urlRoutes
);

/*
 * Keep redirect routes after API routes.
 *
 * /abc123       -> redirect
 * /api/v1/...   -> REST API
 */
app.use("/", redirectRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;