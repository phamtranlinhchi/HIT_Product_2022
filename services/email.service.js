const sendEmail = require("../utils/sendEmail");

const sendResetPasswordEmail = async (to, resetPasswordUrl) => {
    const subject = "Reset password";
    // replace this url with the link to the reset password page of your front-end app
    const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
    const options = {
        email: to,
        subject,
        message: text,
    };

    await sendEmail(options);
};

module.exports = {
    sendResetPasswordEmail,
};
