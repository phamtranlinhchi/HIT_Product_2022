const express = require("express");
const router = express.Router();

const { statusBookUserController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router
    .route("/")
    .get(statusBookUserController.getStatuses)
    .post(statusBookUserController.createStatus);

router
    .route("/:statusId")
    .get(statusBookUserController.getStatus)
    .put(statusBookUserController.updateStatus)
    .delete(statusBookUserController.deleteStatus);
module.exports = router;