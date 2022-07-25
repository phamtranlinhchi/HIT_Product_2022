const express = require("express");

const router = express.Router();

const { transactionController } = require("../controllers/index");
const { authController } = require("../controllers/index");

<<<<<<< HEAD
router.route("/transaction");
// .post(authController.protect, transactionController.transaction);
=======
// router.route("/transaction").post(authController.protect, transactionController.transaction);
>>>>>>> 528799b (features/socket_comments)

module.exports = router;
