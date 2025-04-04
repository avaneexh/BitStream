import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "", 
    },
    streamKey: {
      type: String,
      unique: true,
    },
    refreshToken: {
        type: String,
    },
    platforms: {
      youtube: {
        type: String,
        default: null, 
      },
      facebook: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await hashPassword(this.password);
    next();
  });

export default mongoose.model("User", userSchema);
