const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { statusBookUserService } = require("../services");

module.exports = {
    createStatus: asyncHandle(async(req, res, next) => {
        const status = await statusBookUserService.createBook(req.body);
        res.status(httpStatus.CREATED).send(status);
    }),

    getStatuses: asyncHandle(async(req, res, next) => {
        const books = await bookService.getBooks(req.query);
        res.status(httpStatus.OK).json({
            status: "success",
            result: books.length,
            data: {
                books: books,
            },
        });
    }),

    getStatus: asyncHandle(async(req, res, next) => {
        const book = await bookService.getBookById(req.params.bookId);
        if (!book) {
            return next(new ErrorResponse(httpStatus.NOT_FOUND, "Book not found"));
        }
        res.status(httpStatus.OK).json({
            status: "success",
            book,
        });
    }),

    updateStatus: asyncHandle(async(req, res) => {
        const boStatusok = await bookService.updateBookById(
            req.params.Id,
            req.body
        );
        res.status(httpStatus.OK).json({
            status: "success",
            book,
        });
    }),

    deleteStatus: asyncHandle(async(req, res) => {
        await bookService.deleteBookById(req.params.BookId);
        res.status(httpStatus.NO_CONTENT).json({
            status: "success",
            data: null,
        });
    }),
};