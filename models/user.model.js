const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "User must have email"],
      validate: [validator.isEmail, "Invalid email"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "User must have username"],
    },
    password: {
      type: String,
      required: [true, "User must have password"],
      select: false,
    },
    completeBook: String,
    star: Number,
    statusUser: Boolean,
    money: Number,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExprise: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.isMatchPassword = async function (password) {
  const ismatchPassword = await bcrypt.compare(password, this.password);

  return ismatchPassword;
};
userSchema.methods.signToken = function () {
  return jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPRISE,
  });
};
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(15).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256", process.env.RESET_TOKEN_SECRET)
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExprise =
    Date.now() + process.env.RESET_TOKEN_EXPIRE * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("users", userSchema);
