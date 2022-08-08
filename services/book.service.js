const httpStatus = require("http-status");
const { Book } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const APIFeatures = require("../utils/apiFeatures");

const createBook = async(BookBody) => {
    return Book.create(BookBody);
};

const getBooks = async(BookQuery) => {
    const features = new APIFeatures(Book.find(), BookQuery).filter().sort().limitFields().paginate();

    const books = await features.query;
    return books;
};

const getBookById = async(id) => {
    return Book.findById(id);
};

const updateBookById = async(bookId, updateBody) => {
    // const book = await Book.findByIdAndUpdate(bookId, updateBody, {
    //     new: true,
    //     runValidators: true,
    // });
    const book = await Book.findOne({ _id: bookId }, )
    if (!book) {
        throw new ErrorResponse("Book not found", httpStatus.NOT_FOUND);
    }
    return book;
};

const deleteBookById = async(bookId) => {
    const book = await Book.findById(bookId);
    if (!book) {
        throw new ErrorResponse("Book not found", httpStatus.NOT_FOUND);
    }
    await book.remove();
    return book;
};

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBookById,
    deleteBookById,
};