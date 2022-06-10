const express = require("express");
const router = express.Router();

const { userController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router
    .route("/")
    // .get(authController.protect, userController.getUsers)
    .get(userController.getUsers)
    .post(userController.createUser);

router.route("/:userId").get(userController.getUser).put(userController.updateUser).delete(userController.deleteUser);
module.exports = router;
