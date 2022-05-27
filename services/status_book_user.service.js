const httpStatus = require("http-status");
const { statusBookUser } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const APIFeatures = require("../utils/apiFeatures");

const getStatusBookUsers = async(statusBookUserQuery) => {
    const features = new APIFeatures(statusBookUser.find(), statusBookUserQuery)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const books = await features.query;
    return books;
};

const getStatusBookUserById = async(id) => {
    return statusBookUser.findById(id);
};

module.exports = {
    getStatusBookUsers,
    getStatusBookUserById,
};