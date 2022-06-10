const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { commentBookService } = require("../services");

module.exports = {
    getcommentBook_index: asyncHandle(async (req, res, next) => {
        const user = req.user;
        res.status(httpStatus.OK).render("index", {
            user,
        });
    }),

    createCommentBook: asyncHandle(async (req, res, next) => {
        if (!req.body.user) req.body.user = req.user;
        if (!req.body.book) req.body.book = req.query.book;
        const commentBook = await commentBookService.createCommentBook(req.body);
        res.status(httpStatus.CREATED).send(commentBook);
    }),

    getcommentBooks: asyncHandle(async (req, res, next) => {
        const result = await commentBookService.getCommentBooks(req.query);
        res.send(result);
    }),

    getcommentBook: asyncHandle(async (req, res, next) => {
        const commentBook = await commentBookService.getcommentBookById(req.params.commentBookId);
        if (!commentBook) {
            return next(new ErrorResponse(httpStatus.NOT_FOUND, "CommentBook not found"));
        }
        res.status(httpStatus.OK).json({
            status: "success",
            commentBook,
        });
    }),

    updateCommentBook: asyncHandle(async (req, res) => {
        const commentBook = await commentBookService.updateCommentBookById(req.params.commentBookId, req.body);
        res.status(httpStatus.OK).json({
            status: "success",
            commentBook,
        });
    }),

    deletecommentBook: asyncHandle(async (req, res) => {
        await commentBookService.deleteCommentBookById(req.params.commentBookId);
        res.status(httpStatus.NO_CONTENT).json({
            status: "success",
        });
    }),
};
