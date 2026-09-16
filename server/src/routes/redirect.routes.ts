import { Router } from "express";

import { redirectUrl } from "../controllers/url.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Redirect a short URL
 *     description: Resolves the short code, increments its click count and redirects to the original URL.
 *     tags:
 *       - Redirect
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         example: X7kP2qA
 *     responses:
 *       302:
 *         description: Redirect to original URL
 *       404:
 *         description: Short URL not found
 *       410:
 *         description: Short URL expired or inactive
 */
router.get(
  "/:shortCode",
  asyncHandler(redirectUrl)
);

export default router;