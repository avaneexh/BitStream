import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["signup", "reset", "verify"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60, 
    },
  }
);

export default mongoose.model("Otp", otpSchema);
