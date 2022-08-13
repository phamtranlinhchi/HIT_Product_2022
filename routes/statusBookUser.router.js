const express = require("express");
const router = express.Router();

const { statusBookUserController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/").get(statusBookUserController.getStatuses).post(statusBookUserController.createStatus);

router
    .route("/:statusId")
    .get(statusBookUserController.getStatus)
    .put(statusBookUserController.updateStatus)
    .delete(statusBookUserController.deleteStatus);
module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Status Book User
 */

/**
 * @swagger
 * /api/status-book-user: {
 *     "post": {
 *      "summary": "Create a status book-user",
 *       "tags": ["Status Book User"],
 *       "description": "Create new book in system",
 *       "parameters": [
 *        {
 *           "name": "statusBkUsers",
 *           "in": "body",
 *           "description": "User that we want to create",
 *           "schema": {
 *            "$ref": "#/definitions/statusBkUsers"
 *           }
 *         }
 *       ],
 *       "produces": ["application/json"],
 *       "responses": {
 *        "200": {
 *          "description": "New book is created",
 *         "schema": {
 *           "$ref": "#/definitions/statusBkUsers"
 *         }
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * /api/status-book-user:
 *   get:
 *     summary: Get all status book user
 *     description: Get all status book user
 *     tags: [Status Book User]
 *     responses:
 *       200:
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/status-book-user/{statusId}:
 *   get:
 *     summary: Get a status book-user
 *     tags: [Status Book User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: statusId
 *         required: true
 *         schema:
 *           type: string
 *         description: statusId
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
 *     summary: Update a status book-user
 *     tags: [Status Book User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: statusId
 *         required: true
 *         schema:
 *           type: string
 *         description: statusId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  statusBookUser:
 *                    type: number
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
 *     summary: Delete a status book-user
 *     tags: [Status Book User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: statusId
 *         required: true
 *         schema:
 *           type: string
 *         description: statusId
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