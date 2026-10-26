import nodemailer from "nodemailer";
import { Resend } from "resend";

// EMAIL_PROVIDER=gmail  (default) -> Gmail SMTP, kisi bhi user ko email bhej sakta hai
// EMAIL_PROVIDER=resend           -> Resend, but sirf tab jab apna domain Resend me verify ho

let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });
  }
  return transporter;
};

let resend;
const getResend = () => {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
};

export default async function sendEmail({ to, subject, text }) {
  if (process.env.EMAIL_PROVIDER === "resend") {
    const { data, error } = await getResend().emails.send({
      from: process.env.EMAIL_FROM,
      to: [to],
      subject,
      text,
    });

    if (error) {
      throw new Error(`Email sending failed: ${error.message}`);
    }
    return data;
  }

  return getTransporter().sendMail({
    from: `"${process.env.EMAIL_FROM_NAME || "My MERN App"}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
}