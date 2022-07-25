const express = require("express");
const router = express.Router();

const { bookController } = require("../controllers/index");
const { authController } = require("../controllers/index");

router.route("/").get(bookController.getBooks).post(bookController.createBook);

router
    .route("/:bookId")
    .get(bookController.getBook)
    .patch(bookController.uploadBookImages, bookController.resizeBookImages, bookController.updateBook)
    .delete(bookController.deleteBook);

module.exports = router;