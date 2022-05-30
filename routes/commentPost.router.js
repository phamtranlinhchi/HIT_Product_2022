const express = require("express");
const router = express.Router();

const { commentPostController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router
    .route("/")
    .get(commentPostController.getcommentPosts)
    .post(commentPostController.createCommentPost);

router
    .route("/:commentPostId")
    .get(commentPostController.createCommentPost)
    .put(commentPostController.updateCommentPost)
    .delete(commentPostController.deletecommentPost);
module.exports = router;