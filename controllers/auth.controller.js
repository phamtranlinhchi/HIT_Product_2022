const jwt = require("jsonwebtoken");
const asyncHandle = require("../middlewares/asyncHandle");
const ErrorResponse = require("../utils/ErrorResponse");
const { User } = require("../models/index");
const sendEmail = require("../utils/sendEmail");
const httpStatus = require("http-status");
const { tokenService } = require("../services/index");
const { authService } = require("../services/index");
const { tokenTypes } = require("../config/tokens");

module.exports = {
  signup: asyncHandle(async (req, res, next) => {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      completeBook: req.body.completeBook,
      star: req.body.star,
      statusUser: req.body.statusUser,
      money: req.body.money,
      role: req.body.role,
    });
    const tokens = await tokenService.generateAuthTokens(user);

    res.status(httpStatus.CREATED).json({
      message: "signup successful",
      user,
      tokens,
    });
  }),
  login: asyncHandle(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new ErrorResponse(
          "Provide your email and password",
          httpStatus.BAD_REQUEST
        )
      );
    }

    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );

    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).json({
      status: "success",
      user,
      tokens,
    });
  }),
  protect: asyncHandle(async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new ErrorResponse("Please login to access", httpStatus.UNAUTHORIZED)
      );
    }

    const decoded = await tokenService.verifyToken(token, tokenTypes.REFRESH);
    const user = await User.findById(decoded.user);

    if (!user) {
      return next(new ErrorResponse("Invalid token", httpStatus.UNAUTHORIZED));
    }

    req.user = user;
    next();
  }),
  forgotPassword: asyncHandle(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return next(
        new ErrorResponse("Provide your email", httpStatus.UNAUTHORIZED)
      );
    }
    const resetToken = await tokenService.generateResetPasswordToken(email);

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password?token=${resetToken}`;

    const message = `Please click on ${resetURL} to update password, Link exists in ${process.env.RESET_TOKEN_EXPIRE}`;

    const options = {
      email,
      subject: "Forgot Password?",
      message,
    };

    await sendEmail(options);

    res.status(200).json({
      message: "Password reset link sent to your email",
      resetURL,
    });
  }),
  resetPassword: asyncHandle(async (req, res, next) => {
    await authService.resetPassword(req.query.token, req.body.password);

    res.status(httpStatus.OK).json({
      message: "Reset password success",
    });
  }),
};
