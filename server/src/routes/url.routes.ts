import { Router } from "express";

import {
  createUrl,
  getUrl,
  getUrls,
  removeUrl,
} from "../controllers/url.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import { createUrlLimiter } from "../middleware/rateLimit.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createUrlSchema } from "../validators/url.validator.js";

const router = Router();

router.get(
  "/",
  asyncHandler(getUrls)
);

router.get(
  "/:id",
  asyncHandler(getUrl)
);

router.post(
  "/",
  createUrlLimiter,
  validate(createUrlSchema),
  asyncHandler(createUrl)
);

router.delete(
  "/:id",
  asyncHandler(removeUrl)
);

export default router;