
import { Resend } from "resend";
import nodemailer from "nodemailer";

let resend;

const getResend = () => {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing");
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

async function sendWithBrevo({ to, subject, text }) {
  console.log("sender:", JSON.stringify(process.env.BREVO_SENDER_EMAIL));
  if (
    !process.env.BREVO_API_KEY ||
    !process.env.BREVO_SENDER_EMAIL
  ) {
    throw new Error("Brevo environment variables are missing");
  }

  const response = await fetch(
     "https://api.brevo.com/v3/smtp/email",
    {
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
    }
  );

  if (!response.ok) {
    throw new Error(
      `Brevo email failed (${response.status}): ${await response.text()}`
    );
  }

  return response.json();
}

export default async function sendEmail({ to, subject, text }) {
  if (!to || !subject || !text) {
    throw new Error("to, subject and text are required");
  }

  const provider = (
    process.env.EMAIL_PROVIDER || "brevo"
  ).trim().toLowerCase();

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
      throw new Error(`Resend email failed: ${error.message}`);
    }

    return data;
  }

  if (provider === "gmail") {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    return transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  }

  throw new Error(`Unsupported EMAIL_PROVIDER: ${provider}`);
}
