import { asyncHandler } from "../utils/asyncHandler.js";
import Otp  from "../models/otpModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendMail } from "../utils/sendEmail.js";
import { ApiError } from "../utils/ApiError.js";
import { VerifiedOtp } from "../models/verifiedOtpModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import User from "../models/userModel.js";
import { hashPassword, verifyPassword} from "../utils/bcrypt.js";

const getOtp = asyncHandler(async (req, res) => {
 try {
   const { email, purpose } = req.body;
 
   if (!email || !purpose) {
     throw new ApiError(400, "Email and purpose are required");
   }
 
   const otp = await generateOtp(email, purpose);
 
   // Send mail
   await sendMail({
     to: email,
     subject: `OTP for ${purpose} at BitStream`,
     text: `Your OTP for ${purpose} at BitStream is ${otp} and expires in 1 min `,
   });
 
   res.status(200).json(
     new ApiResponse(200, null, `OTP sent successfully to ${email}`)
   );
 
 } catch (error) {
  throw new ApiError(401, error?.message || "Error While sending otp");
 }
});

const verifyEmail = asyncHandler(async (req, res) => {
 try {
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
 
 } catch (error) {
    throw new ApiError(401, error?.message || "Error while verifying email");
 }});


const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, username, password, avatar } = req.body;
    
    // Check required fields
    if (!name || !email || !username || !password) {
      throw new ApiError(400, "Name, email, username and password are required");
    }
    
    // Check if the email is verified via OTP
    const verified = await VerifiedOtp.findOne({ email, purpose: "signup" });
    if (!verified) {
      throw new ApiError(400, "Email has not been verified");
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists with this email");
    }
    
    const user = await User.create({ name, email, username, password, avatar });
    
    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // Store refresh token in the user's document
    user.refreshToken = refreshToken;
    
    await user.save();
  
    const createdUser = await User.findById(user._id).select(
      "-password"
  );
    // Cleanup: remove the verified email record
    await VerifiedOtp.deleteOne({ email, purpose: "register" });
    
    res.status(201).json(
      new ApiResponse(201, { createdUser, accessToken }, "Registration successful")
    );
  } catch (error) {
    throw new ApiError(401, error?.message || "Error registering user");
  }
});

const loginUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!username && !email) {
      throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged In Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Error while logging user ");
  }
};


export {
  getOtp,
  verifyEmail,
  registerUser,
  loginUser,
}