const express = require("express");
const router = express.Router();

const { postController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/").get(postController.getPosts).post(postController.createPost);

router.route("/:postId").get(postController.getPost).put(postController.updatePost).delete(postController.deletePost);

module.exports = router;
