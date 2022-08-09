const express = require("express");
const router = express.Router();

const { bookController } = require("../controllers/index");
const { authController } = require("../controllers/index");
/**
 * @swagger
 * /api/books/:
 *   get:
 *     description: Get allbook and create book
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.route("/").get(bookController.getBooks).post(bookController.createBook);
/**
 *  @swagger
 * paths:
 * api/books/{bookID}:
 *  get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *        name: bookId
 *        schema:
 *           type: Object
 *        required: true
 *         description: Numeric ID of the user to get
 */
router
    .route("/:bookId")
    .get(bookController.getBook)
    .patch(bookController.uploadBookImages, bookController.resizeBookImages, bookController.updateBook)
    .delete(bookController.deleteBook);

module.exports = router;