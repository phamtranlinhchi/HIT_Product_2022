const express = require("express");
const router = express.Router();

const { authController } = require("../controllers/index");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");
require("../services/passport.service");

router.post("/signup", validate(authValidation.register), authController.signup);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", validate(authValidation.logout), authController.logout);
router.post("/logout", validate(authValidation.logout), authController.logout);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/error" }), function(req, res) {
    // Successful authentication, redirect success.
    res.redirect("/");
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.post("/forgotPassword", validate(authValidation.forgotPassword), authController.forgotPassword);
router.post("/reset-password", validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;