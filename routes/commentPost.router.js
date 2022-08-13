const express = require("express");
const router = express.Router();

const { commentPostController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/").get(commentPostController.getcommentPosts).post(commentPostController.createCommentPost);

router
    .route("/:commentPostId")
    .get(commentPostController.createCommentPost)
    .put(commentPostController.updateCommentPost)
    .delete(commentPostController.deletecommentPost);
module.exports = router;
/**
 * @swagger
 * tags:
 *   name: CommentPost
 */

/**
 * @swagger
 * /api/comment-posts/: {
 *     "post": {
 *      "summary": "Create a comment post",
 *       "tags": ["CommentPost"],
 *       "description": "Create new comment post in system",
 *       "parameters": [
 *        {
 *           "name": "commentPosts",
 *           "in": "body",
 *           "description": "User that we want to create",
 *           "schema": {
 *            "$ref": "#/definitions/commentPosts"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *        "200": {
 *          "description": "New comment post is created",
 *         "schema": {
 *           "$ref": "#/definitions/commentPosts"
 *         }
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * /api/comment-posts:
 *   get:
 *     summary: Get all comment post
 *     description: Get all comment post
 *     tags: [CommentPost]
 *     responses:
 *       200:
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/comment-post/{commentPostId}:
 *   get:
 *     summary: Get a comment post
 *     tags: [CommentPost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentPostId
 *         required: true
 *         schema:
 *           type: string
 *         description: commentPostId
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
 *     summary: Update a comment post
 *     tags: [CommentPost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentPostId
 *         required: true
 *         schema:
 *           type: string
 *         description: commentPostId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  users:
 *                    type: string
 *                  post:
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
 *     summary: Delete a comment post
 *     tags: [CommentPost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentPostId
 *         required: true
 *         schema:
 *           type: string
 *         description: commentPostId
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