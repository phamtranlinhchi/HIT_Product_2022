const express = require("express");
const router = express.Router();

const { authController } = require("../controllers/index");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: Create a new account.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: account
 *        description: The infomation of a new account.
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            username:
 *              type: string
 *            password:
 *              type: string
 *            completeBook:
 *              type: string
 *            star:
 *              type: string
 *            statusUser:
 *              type: string
 *            money:
 *              type: string
 *            role:
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
 *                password:string
 *                message:string
 *                tokens:object
 */
router.post("/signup", validate(authValidation.register), authController.signup);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: account
 *        description: Use an existed account to log in.
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                email:string
 *                username:string
 *                password:string
 *                message:string
 *                tokens:object
 */
router.post("/login", validate(authValidation.login), authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *    summary: Logout.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: account
 *        description: Log out the current account.
 *        schema:
 *          type: object
 *          required:
 *            - refreshToken
 *          properties:
 *            refreshToken:
 *              type: string
 *    responses:
 *      204:
 *        description: No Content
 */
router.post("/logout", validate(authValidation.logout), authController.logout);

/**
 * @swagger
 * /api/auth/forgotPassword:
 *  post:
 *    summary: Forgot passord.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: account
 *        description: Send link to reset password.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              type: string
 *    responses:
 *      200:
 *        description: Success
 *    content:
 *        application/json:
 *         schema:
 *            properties:
 *              message:string
 */
router.post("/forgotPassword", validate(authValidation.forgotPassword), authController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *  post:
 *    summary: Reset password.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: token
 *        schema:
 *          type: string
 *        description: the token sent to user email
 *      - in: body
 *        name: account
 *        description: Change password through link.
 *        schema:
 *          type: object
 *          required:
 *            - password
 *          properties:
 *            password:
 *              type: string
 *    responses:
 *      200:
 *        description: Success
 *    content:
 *        application/json:
 *         schema:
 *            properties:
 *              message:string
 */
router.post("/reset-password", validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;
