const crypto = require("crypto");
const asyncHandle = require("../middlewares/asyncHandle");
const ErrorResponse = require("../utils/ErrorResponse");
const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

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

    res.status(201).json({
      message: "signup successful",
    });
  }),
  login: asyncHandle(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return next(new ErrorResponse("Provide your email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Incorrect Password or email", 401));
    }
    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("Incorrect Password", 400));
    }

    const token = user.signToken();
    res.cookie("tokens", token, {
      exprises: new Date(
        Date.now() + process.env.TOKEN_COOKIE_EXPRISE_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      token,
    });
  }),
  protect: asyncHandle(async (req, res, next) => {
    let token;
    if (res.headers.authorization?.startsWith("Bearer")) {
      token = res.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ErrorResponse("Please login to access", 401));
    }

    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("Invalid token", 401));
    }

    req.user = user;
    next();
  }),
  forgotPassword: asyncHandle(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return next(new ErrorResponse("Provide your email", 401));
    }
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("User do not exist", 401));
    }
    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;

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
    const resetPasswordToken = crypto
      .createHash("sha256", process.env.RESET_TOKEN_SECRET)
      .update(req.params.resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExprise: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Token is invalid or has exprised", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExprise = undefined;
    await user.save();

    res.status(200).json({
      message: "Reset password success",
    });
  }),
};
