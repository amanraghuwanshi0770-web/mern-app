
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

transporter.verify()
  .then(() => console.log("SMTP connection successful"))
  .catch((err) => {
    console.error("SMTP verify failed:", err.message);
    console.error("SMTP error code:", err.code);
  });

export default transporter;
