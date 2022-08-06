const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const moment = require("moment");
const userService = require("./user.service");
const { Token } = require("../models");
const { User } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const { tokenTypes } = require("../config/tokens");

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = process.env.TOKEN_SECRET) => {
    const payload = {
        sub: userId,
        type,
    };
    return jwt.sign(payload, secret, {
        expiresIn: expires,
    });
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires,
        type,
    });
    return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const tokenDoc = await Token.findOne({
        token,
        type,
        user: payload.sub,
    });
    if (!tokenDoc) {
        throw new Error("Token not found");
    }
    return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
    const accessTokenExpires = process.env.TOKEN_EXPRISE;
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpiresDoc = moment().add(1, "days");
    const refreshTokenExpires = process.env.REFRESH_TOKEN_EXPRISE;
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpiresDoc, tokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
        },
        refresh: {
            token: refreshToken,
        },
    };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new ErrorResponse(httpStatus.NOT_FOUND, "No users found with this email");
    }
    const expires = process.env.RESET_TOKEN_EXPIRE * 60 * 100;
    const expiresDoc = moment().add(1, "minutes");
    const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
    await saveToken(resetPasswordToken, user.id, expiresDoc, tokenTypes.RESET_PASSWORD);
    return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
// const generateVerifyEmailToken = async (user) => {
//   const expires = moment().add(
//     config.jwt.verifyEmailExpirationMinutes,
//     "minutes"
//   );
//   const verifyEmailToken = generateToken(
//     user.id,
//     expires,
//     tokenTypes.VERIFY_EMAIL
//   );
//   await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
//   return verifyEmailToken;
// };

module.exports = {
    generateToken,
    generateAuthTokens,
    saveToken,
    verifyToken,
    generateResetPasswordToken,
};
