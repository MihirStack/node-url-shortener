/**
 * @swagger
 * /api/v1/urls:
 *   post:
 *     tags:
 *       - URLs
 *     summary: Create a short URL
 *     description: Creates a unique short URL from a valid original URL.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUrlRequest'
 *
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Short URL created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Url'
 *
 *       400:
 *         description: Invalid URL or request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       429:
 *         description: Too many requests
 *
 *       500:
 *         description: Internal server error
 *
 *
 *   get:
 *     tags:
 *       - URLs
 *     summary: Get all URLs
 *     description: Returns all shortened URLs.
 *
 *     responses:
 *       200:
 *         description: URLs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: URLs retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Url'
 *
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/urls/{id}:
 *   get:
 *     tags:
 *       - URLs
 *     summary: Get URL by ID
 *     description: Returns a single shortened URL.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB URL document ID
 *         schema:
 *           type: string
 *         example: 68c94f24d18e123456789abc
 *
 *     responses:
 *       200:
 *         description: URL retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: URL retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Url'
 *
 *       400:
 *         description: Invalid URL ID
 *
 *       404:
 *         description: URL not found
 *
 *       500:
 *         description: Internal server error
 *
 *
 *   delete:
 *     tags:
 *       - URLs
 *     summary: Delete URL
 *     description: Deletes a shortened URL using its ID.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB URL document ID
 *         schema:
 *           type: string
 *         example: 68c94f24d18e123456789abc
 *
 *     responses:
 *       200:
 *         description: URL deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: URL deleted successfully
 *
 *       400:
 *         description: Invalid URL ID
 *
 *       404:
 *         description: URL not found
 *
 *       500:
 *         description: Internal server error
 */

export {};