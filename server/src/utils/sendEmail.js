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
  const res = transporter.sendMail(mailOptions);
  console.log("mail response",res);
  return res;
};
