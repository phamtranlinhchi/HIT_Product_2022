const httpStatus = require("http-status");
const { statusBookUser } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const APIFeatures = require("../utils/apiFeatures");

const createStatusBookUser = async (statusBookUserBody) => {
    return statusBookUser.create(statusBookUserBody);
};

const getStatusBookUsers = async (statusBookUserQuery) => {
    const features = new APIFeatures(statusBookUser.find(), statusBookUserQuery)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const statuses = await features.query;
    return statuses;
};

const getStatusBookUserById = async (id) => {
    return statusBookUser.findById(id);
};

const updateStatusBookUserById = async (statusId, updateBody) => {
    const status = await statusBookUser.findByIdAndUpdate(statusId, updateBody, {
        new: true,
        runValidators: true,
    });
    if (!status) {
        throw new ErrorResponse(" Status Book User not found", httpStatus.NOT_FOUND);
    }
    return status;
};

const deleteStatusBookUserId = async (statusId) => {
    const status = await statusBookUser.findById(statusId);
    if (!status) {
        throw new ErrorResponse("Status Book User not found", httpStatus.NOT_FOUND);
    }
    await status.remove();
    return status;
};

module.exports = {
    createStatusBookUser,
    getStatusBookUsers,
    getStatusBookUserById,
    updateStatusBookUserById,
    deleteStatusBookUserId,
};
