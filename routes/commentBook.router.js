const express = require("express");
const router = express.Router();

const { commentBookController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/fetch").get(commentBookController.getcommentBook_index);
router.route("/").get(commentBookController.getcommentBooks).post(commentBookController.createCommentBook);

router
    .route("/:commentBookId")
    .get(commentBookController.getcommentBook)
    .put(commentBookController.updateCommentBook)
    .delete(commentBookController.deletecommentBook);

// router.route("").get(commentBookController.createCommentBook)
// router.route('/add').post(commentBookController.createCommentBook)
module.exports = router;