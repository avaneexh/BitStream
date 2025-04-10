import express from "express";
import { AuthAPI } from "../controllers/index.js";

const router = express.Router();

router.post("/get-otp", AuthAPI.getOtp);
router.post("/verify-email", AuthAPI.verifyEmail);
router.post("/register", AuthAPI.registerUser);

export  {router};

