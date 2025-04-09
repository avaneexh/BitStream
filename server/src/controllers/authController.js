import { asyncHandler } from "../../utils/asyncHandler.js";
import { Otp } from "../../models/Otp.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { generateOtp } from "../../utils/generateOtp.js";
import { sendMail } from "../../utils/sendEmail.js";
import { ApiError } from "../../utils/ApiError.js";
import { VerifiedOtp } from "../../models/VerifiedOtp.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/authUtils.js";
import User from "../../models/user.model.js";

const sendOtp = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body;

  if (!email || !purpose) {
    throw new ApiError(400, "Email and purpose are required");
  }

  const otp = await generateOtp(email, purpose);

  // Send mail
  await sendMail({
    to: email,
    subject: `OTP for ${purpose}`,
    text: `Your OTP for ${purpose} is ${otp}`,
  });

  res.status(200).json(
    new ApiResponse(200, null, `OTP sent successfully to ${email}`)
  );
});

    const verifyEmail = asyncHandler(async (req, res) => {
    const { email, otp, purpose } = req.body;
  
    if (!email || !otp || !purpose) {
      throw new ApiError(400, "Email, OTP, and purpose are required");
    }
  
    // Find the OTP record for the given email and purpose
    const existingOtp = await Otp.findOne({ email, purpose });
    if (!existingOtp) {
      throw new ApiError(400, "OTP not found or expired");
    }
  
    // Validate the OTP
    if (existingOtp.otp !== otp) {
      throw new ApiError(400, "Invalid OTP");
    }
  
    // OTP is valid, store the email in VerifiedOtp (upsert)
    await VerifiedOtp.findOneAndUpdate(
      { email, purpose },
      { email, purpose, verifiedAt: new Date() },
      { upsert: true, new: true }
    );
  
    // Remove the used OTP record
    await Otp.deleteOne({ email, purpose });
  
    res.status(200).json(
      new ApiResponse(200, null, "Email verified successfully")
    );
    });

    const registerUser = asyncHandler(async (req, res) => {
    const { name, email, username, password, avatar } = req.body;
  
    // Check required fields
    if (!name || !email || !username || !password) {
      throw new ApiError(400, "Name, email, username and password are required");
    }
  
    // Check if the email is verified via OTP
    const verified = await VerifiedOtp.findOne({ email, purpose: "register" });
    if (!verified) {
      throw new ApiError(400, "Email has not been verified");
    }
  
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists with this email");
    }
  
    // Create the new user (password hashing will occur in pre-save hook)
    const user = await User.create({ name, email, username, password, avatar });
  
    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
  
    // Store refresh token in the user's document
    user.refreshToken = refreshToken;
    await user.save();
  
    // Cleanup: remove the verified email record
    await VerifiedOtp.deleteOne({ email, purpose: "register" });
  
    res.status(201).json(
      new ApiResponse(201, { user, accessToken, refreshToken }, "Registration successful")
    );
    });

export {
    sendOtp,
    verifyEmail,
    registerUser
}