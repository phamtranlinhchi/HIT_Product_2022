const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { userService } = require("../services");

const createUser = asyncHandle(async (req, res, next) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json({
    user,
  });
});

const getUsers = asyncHandle(async (req, res, next) => {
  const result = await userService.getUsers(req.query);
  res.status(httpStatus.OK).json({
    status: "success",
    result,
  });
});

const getUser = asyncHandle(async (req, res, next) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    return next(new ErrorResponse(httpStatus.NOT_FOUND, "User not found"));
  }
  res.status(httpStatus.OK).json({
    status: "success",
    user,
  });
});

const updateUser = asyncHandle(async (req, res, next) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.status(httpStatus.OK).json({
    status: "success",
    user,
  });
});

const deleteUser = asyncHandle(async (req, res, next) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).json({
    status: "success",
  });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
