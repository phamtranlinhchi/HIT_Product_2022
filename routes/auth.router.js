const express = require("express");
const router = express.Router();

const { authController } = require("../controllers/index");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");

router.post(
  "/signup",
  validate(authValidation.register),
  authController.signup
);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", validate(authValidation.logout), authController.logout);
router.post("/logout", validate(authValidation.logout), authController.logout);

router.post(
  "/forgotPassword",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);

module.exports = router;
