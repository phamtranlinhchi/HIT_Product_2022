const express = require("express");
const router = express.Router();

const { userController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/top-user").get(userController.getUserTopByStar);

router
    .route("/")

// .get(authController.protect, userController.getUsers)
.get(userController.getUsers)

.post(userController.createUser);

router.route("/tokenUser").get(authController.getUserByToken);
router.route("/:userId").get(userController.getUser).put(userController.updateUser).delete(userController.deleteUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * /api/users/top-user:
 *   get:
 *     summary: Get the top 3 users with the most stars
 *     description: Get top 3 user
 *     tags: [ User]
 *     responses:
 *       200:
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     tags: [ User]
 *     responses:
 *       200:
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Creates a new user.
 *    tags: [ User]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *          properties:
 *            email:
 *              type: string
 *            username:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                email:string
 *                username:string
 *                 password:string
 */

/**
 * @swagger
 * /api/users/tokenUser:
 *   get:
 *     summary: Get token user
 *     description: Get token user
 *     tags: [ User]
 *     responses:
 *       200:
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get a user by id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User Id
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
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  email:
 *                    type: string
 *                  username:
 *                   type: string
 *                   password:
 *                     type: string
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
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User Id
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