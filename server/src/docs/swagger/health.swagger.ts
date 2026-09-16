/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     tags:
 *       - Health
 *
 *     summary: API health check
 *
 *     description:
 *       Checks whether the URL Shortener API is running.
 *
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: API is running
 *
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */

export {};