const express = require("express");
const router = express.Router();

const { commentBookController } = require("../controllers/index");
const { authController } = require("../controllers/index");

// router.route("/fetch").get(commentBookController.getcommentBook_index);
router.route("/").get(commentBookController.getcommentBooks).post(commentBookController.createCommentBook);

router
    .route("/:commentBookId")
    .get(commentBookController.getcommentBook)
    .put(commentBookController.updateCommentBook)
    .delete(commentBookController.deletecommentBook);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: CommentBook
 */

/**
 * @swagger
 * /api/commentBooks/: {
 *     "post": {
 *      "summary": "Create a comment book",
 *       "tags": ["CommentBook"],
 *       "description": "Create new comment book in system",
 *       "parameters": [
 *        {
 *           "name": "commentBooks",
 *           "in": "body",
 *           "description": "Comment post that we want to create",
 *
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *        "200": {
 *          "description": "New comment book is created",
 *
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * /api/commentBooks:
 *   get:
 *     summary: Get all comment book
 *     description: Get all comment book
 *     tags: [CommentBook]
 *     responses:
 *       200:
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/commentBooks/{commentBookId}:
 *   get:
 *     summary: Get a comment book
 *     tags: [CommentBook]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentBookId
 *         required: true
 *         schema:
 *           type: string
 *         description: commentBookId
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
 *     summary: Update a comment book
 *     tags: [CommentBook]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentBookId
 *         required: true
 *         schema:
 *           type: string
 *         description: commentBookId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  users:
 *                    type: string
 *                  book:
 *                   type: string
 *                   commentPostContent:
 *                     type: string
 *
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
 *     summary: Delete a comment book
 *     tags: [CommentBook]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentBookId
 *         required: true
 *         schema:
 *           type: string
 *         description: commentBookId
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