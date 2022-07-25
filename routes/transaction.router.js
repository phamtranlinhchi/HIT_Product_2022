const express = require("express");

const router = express.Router();

const { transactionController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/transaction");
// .post(authController.protect, transactionController.transaction);
// router.route("/transaction").post(authController.protect, transactionController.transaction);

module.exports = router;