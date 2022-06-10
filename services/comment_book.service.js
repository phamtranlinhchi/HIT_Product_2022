const httpStatus = require("http-status");
const { CommentBook } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const APIFeatures = require("../utils/apiFeatures");

const createCommentBook = async (commentBookBody) => {
    return CommentBook.create(commentBookBody);
};

const getCommentBooks = async (commentBookQuery) => {
    const features = new APIFeatures(CommentBook.find(), commentBookQuery).filter().sort().limitFields().paginate();

    const commentBooks = await features.query;
    return commentBooks;
};

const getcommentBookById = async (id) => {
    return CommentBook.findById(id);
};

const updateCommentBookById = async (CommentBookId, updateBody) => {
    const commentBook = await CommentBook.findByIdAndUpdate(CommentBookId, updateBody, {
        new: true,
        runValidators: true,
    });
    if (!commentBook) {
        throw new ErrorResponse(" CommentBook not found", httpStatus.NOT_FOUND);
    }
    return commentBook;
};

const deleteCommentBookById = async (commentBookId) => {
    const commentBook = await getcommentBookById(commentBookId);
    if (!commentBook) {
        throw new ErrorResponse("CommentBook not found", httpStatus.NOT_FOUND);
    }
    await commentBook.remove();
    return commentBook;
};

module.exports = {
    createCommentBook,
    getCommentBooks,
    getcommentBookById,
    updateCommentBookById,
    deleteCommentBookById,
};
