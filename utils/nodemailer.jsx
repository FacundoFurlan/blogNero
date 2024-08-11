const nodemailer = require("nodemailer");

const MAIL = process.env.SECRET_MAIL;
const PASSWORD = process.env.SECRET_APP_PASS;
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: MAIL,
      pass: PASSWORD,
    },
});
export default transporter;