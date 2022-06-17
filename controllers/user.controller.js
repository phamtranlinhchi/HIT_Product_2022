const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { userService } = require("../services");
const { User } = require("../models");

<<<<<<< HEAD
// <<<<<<< HEAD
const createUser = asyncHandle(async(req, res, next) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).json({
        user,
    });
});
// =======
// const createUser = asyncHandle(async(req, res, next) => {
//     const user = await userService.createUser(req.body);
//     res.status(httpStatus.CREATED).send(user);
// >>>>>>> 10afc9b (top-3-user)
// });

const getUsers = asyncHandle(async(req, res, next) => {
    const result = await userService.getUsers(req.query);
    res.status(httpStatus.OK).json({
        status: "success",
        result,
    });
});

const getUser = asyncHandle(async(req, res, next) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        return next(new ErrorResponse(httpStatus.NOT_FOUND, "User not found"));
    }
    res.status(httpStatus.OK).json({
        status: "success",
        user,
    });
});

const updateUser = asyncHandle(async(req, res, next) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
=======
const createUser = asyncHandle(async(req, res, next) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getUsers = asyncHandle(async(req, res, next) => {
    const result = await userService.getUsers(req.query);
    res.status(httpStatus.OK).json({
        status: "success",
        result,
    });
});

const getUser = asyncHandle(async(req, res, next) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        return next(new ErrorResponse(httpStatus.NOT_FOUND, "User not found"));
    }
>>>>>>> 10afc9b (top-3-user)
    res.status(httpStatus.OK).json({
        status: "success",
        user,
    });
});

<<<<<<< HEAD
const deleteUser = asyncHandle(async(req, res, next) => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).json({
        status: "success",
    });
});

=======
const updateUser = asyncHandle(async(req, res, next) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.status(httpStatus.OK).json({
        status: "success",
        user,
    });
});

const deleteUser = asyncHandle(async(req, res, next) => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).json({
        status: "success",
    });
});

>>>>>>> 10afc9b (top-3-user)
const getUserTopByStar = asyncHandle(async(req, res, next) => {
    const top = await User.aggregate([{
            $sort: { star: -1 },
        },
        {
            $limit: 3,
        },
    ]);

    res.status(200).json({
        status: "success",
        data: {
            top,
        },
    });
});

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserTopByStar,
};