const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { statusBookUserService } = require("../services");

module.exports = {
    createStatus: asyncHandle(async (req, res, next) => {
        const status = await statusBookUserService.createStatusBookUser(req.body);
        res.status(httpStatus.CREATED).send(status);
    }),

    getStatuses: asyncHandle(async (req, res, next) => {
        const statuses = await statusBookUserService.getStatusBookUsers(req.query);
        res.status(httpStatus.OK).json({
            status: "success",
            result: statuses.length,
            data: {
                statusBookUser: statuses,
            },
        });
    }),

    getStatus: asyncHandle(async (req, res, next) => {
        const status = await statusBookUserService.getStatusBookUserById(req.params.statusId);
        if (!status) {
            return next(new ErrorResponse(httpStatus.NOT_FOUND, "Status Book User not found"));
        }
        res.status(httpStatus.OK).json({
            status: "success",
            statusBookUser: status,
        });
    }),

    updateStatus: asyncHandle(async (req, res) => {
        const status = await statusBookUserService.updateStatusBookUserById(req.params.statusId, req.body);
        res.status(httpStatus.OK).json({
            status: "success",
            statusBookUser: status,
        });
    }),

    deleteStatus: asyncHandle(async (req, res) => {
        await statusBookUserService.deleteStatusBookUserId(req.params.statusId);
        res.status(httpStatus.NO_CONTENT).json({
            status: "success",
            data: null,
        });
    }),
};
