
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({ to, subject, text }) {
  const { data, error } = await resend.emails.send({
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
