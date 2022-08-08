const express = require("express");
const router = express.Router();

const { userController } = require("../controllers/index");
const { authController } = require("../controllers/index");
/** 
 * @swagger 
 * /api/users/top-user: 
 *   get: 
 *     description: Get top 3 user
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
router.route("/top-user").get(userController.getUserTopByStar);

router
    .route("/")

/** 
 * @swagger 
 * /api/users: 
 *   get: 
 *     description: Get top user
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
// .get(authController.protect, userController.getUsers)
.get(userController.getUsers)

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Creates a new user.
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
.post(userController.createUser);

router
    .route('/tokenUser')
    .get(authController.getUserByToken)
router
    .route("/:userId")
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;

router.route("/:userId").get(userController.getUser).put(userController.updateUser).delete(userController.deleteUser);
module.exports = router;