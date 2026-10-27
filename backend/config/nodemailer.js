
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendEmail({ to, subject, text }) {
  return transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME || "My MERN App"}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
}