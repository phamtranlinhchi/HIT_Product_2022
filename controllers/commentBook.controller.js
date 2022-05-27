const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { commentBookService } = require("../services");

module.exports = {
  createCommentBook: asyncHandle(async (req, res, next) => {
    const commentBook = await commentBookService.createCommentBook(req.body);
    res.status(httpStatus.CREATED).send(commentBook);
  }),

  getcommentBooks: asyncHandle(async (req, res, next) => {
    const result = await commentBookService.getCommentBooks(req.query);
    res.status(httpStatus.OK).json({
      status: "success",
      result,
    });
  }),

  getcommentBook: asyncHandle(async (req, res, next) => {
    const commentBook = await commentBookService.getcommentBookById(
      req.params.commentBookId
    );
    if (!commentBook) {
      return next(
        new ErrorResponse(httpStatus.NOT_FOUND, "CommentBook not found")
      );
    }
    res.status(httpStatus.OK).json({
      status: "success",
      commentBook,
    });
  }),

  updateCommentBook: asyncHandle(async (req, res) => {
    const commentBook = await commentBookService.updateCommentBookById(
      req.params.commentId,
      req.body
    );
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