import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import { authRouter } from "./routes/index.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For JSON body parsing
app.use(cors()); // Enable CORS

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/auth", authRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("server error",err.message);
  res.status(500).json({ message: "Server Error" });
});

export default app;
