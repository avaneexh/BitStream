import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
