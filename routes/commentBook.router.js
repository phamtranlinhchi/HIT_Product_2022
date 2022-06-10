const express = require("express");
const router = express.Router();

const { commentBookController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/fetch").get(commentBookController.getcommentBook_index);
router.route("/").get(commentBookController.getcommentBooks).post(commentBookController.createCommentBook);

router
    .route("/:commentBookId")
    .get(commentBookController.createCommentBook)
    .put(commentBookController.updateCommentBook)
    .delete(commentBookController.deletecommentBook);
module.exports = router;
