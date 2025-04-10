import Otp  from "../models/otpModel.js";

function generateRandomNumber() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export const generateOtp = async (email, purpose) => {
  const otp = generateRandomNumber();
 console.log("generated otp",otp);
 
  await Otp.create({
    email,
    otp,
    purpose,
  });

  return otp;
};  
