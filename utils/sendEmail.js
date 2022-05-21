const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false,
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  console.log(process.env.EMAIL_USER);
  let info = await transporter.sendMail({
    from: "<thuydoan11202@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};

module.exports = sendEmail;
