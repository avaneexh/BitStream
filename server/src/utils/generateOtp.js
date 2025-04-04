import { Otp } from "../models/Otp.js";

function generateRandomNumber() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export const generateOtp = async (email, purpose) => {
  const otp = generateRandomNumber();

  await Otp.create({
    email,
    otp,
    purpose,
  });

  return otp;
};  
