// config/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sujeetsharma0174@gmail.com",      // 👈 Your Gmail ID
    pass: "lszlgawhxrnqbwrm",         // 👈 App Password (not your Gmail password)
  },
});

module.exports = transporter;
