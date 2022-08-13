const express = require("express");
const router = express.Router();

const { bookController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/").get(bookController.getBooks).post(bookController.createBook);

router
    .route("/:bookId")

.get(bookController.getBook)

.patch(bookController.updateBook)

.delete(bookController.deleteBook);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Books
 */

/**
 * @swagger
 * /api/books: {
 *     "post": {
 *      "summary": "Create a book",
 *       "tags": ["Books"],
 *       "description": "Create new book in system",
 *       "parameters": [
 *        {
 *           "name": "books",
 *           "in": "body",
 *           "description": "User that we want to create",
 *           "schema": {
 *            "$ref": "#/definitions/books"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *        "200": {
 *          "description": "New book is created",
 *         "schema": {
 *           "$ref": "#/definitions/books"
 *         }
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     description: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/books/{bookId}:
 *   get:
 *     summary: Get a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book Id
 *     responses:
 *       "200":
 *         description: Success
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  namebook:
 *                    type: string
 *                  video:
 *                   type: string
 *                   description:
 *                     type: string
 *                   contentBook:
 *                    type: string
 *                   numberPage:
 *                      type: number
 *     responses:
 *       "200":
 *         description: Success
 *
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book Id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */