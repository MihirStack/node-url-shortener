/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     tags:
 *       - Redirect
 *
 *     summary: Redirect short URL
 *
 *     description: >
 *       Finds the original URL using the short code,
 *       increments the click count and redirects the
 *       browser to the original URL.
 *
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         description: Unique short URL code
 *         schema:
 *           type: string
 *         example: DDFNH6v
 *
 *     responses:
 *       302:
 *         description: Redirected to the original URL
 *
 *       404:
 *         description: Short URL not found
 *
 *       410:
 *         description: Short URL expired or inactive
 *
 *       500:
 *         description: Internal server error
 */

export {};