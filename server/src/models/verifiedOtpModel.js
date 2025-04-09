import mongoose from "mongoose";

const verifiedOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  verifiedAt: {
    type: Date,
    default: Date.now,
  },
});

export const VerifiedOtp = mongoose.model("VerifiedOtp", verifiedOtpSchema);
