const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { bookService } = require("../services");

module.exports = {
    createBook: asyncHandle(async(req, res, next) => {
        const book = await bookService.createBook(req.body);
        res.status(httpStatus.CREATED).send(book);
    }),

    getBooks: asyncHandle(async(req, res, next) => {
        const books = await bookService.getBooks(req.query);
        res.status(httpStatus.OK).json({
            status: "success",
            result: books.length,
            data: {
                books: books,
            },
        });
    }),

    getBook: asyncHandle(async(req, res, next) => {
        const book = await bookService.getBookById(req.params.bookId);
        if (!book) {
            return next(new ErrorResponse(httpStatus.NOT_FOUND, "Book not found"));
        }
        res.status(httpStatus.OK).json({
            status: "success",
            book,
        });
    }),

    updateBook: asyncHandle(async(req, res) => {
        const book = await bookService.updateBookById(req.params.bookId, req.body);
        res.status(httpStatus.OK).json({
            status: "success",
            book,
        });
    }),

    deleteBook: asyncHandle(async(req, res) => {
        await bookService.deleteBookById(req.params.bookId);
        res.status(httpStatus.NO_CONTENT).json({
            status: "success",
            data: null,
        });
    }),
};