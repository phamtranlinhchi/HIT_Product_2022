const express = require("express");
const router = express.Router();

const { postController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/").get(postController.getPosts).post(postController.createPost);

router.route("/:postId").get(postController.getPost).put(postController.updatePost).delete(postController.deletePost);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Posts
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     description: Get all posts
 *     responses:
 *       200:
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/posts: {
 *     "post": {
 *      "summary": "Create a post",
 *       "tags": ["Posts"],
 *       "description": "Create new post in system",
 *       "parameters": [
 *        {
 *           "name": "posts",
 *           "in": "body",
 *           "description": "User that we want to create",
 *
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *        "200": {
 *          "description": "New book is created",
 *
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: Get a post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: postId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Update a post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   namebook:
 *                       type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete a post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: postId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */