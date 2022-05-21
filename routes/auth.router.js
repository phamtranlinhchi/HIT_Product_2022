const express = require("express");
const router = express.Router();

const { authController } = require("../controllers/index");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.post("/reset-password/:resetToken", authController.resetPassword);

module.exports = router;
