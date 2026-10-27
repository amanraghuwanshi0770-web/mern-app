import { Resend } from "resend";
let resend;
const getResend = () => {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
};

const sendWithBrevo = async ({ to, subject, text }) => {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: process.env.EMAIL_FROM_NAME || "My MERN App",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject,
      textContent: text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo email failed (${res.status}): ${body}`);
  }
  return res.json();
};

export default async function sendEmail({ to, subject, text }) {
  const provider = process.env.EMAIL_PROVIDER;

  if (provider === "brevo") {
    return sendWithBrevo({ to, subject, text });
  }

  if (provider === "resend") {
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

}