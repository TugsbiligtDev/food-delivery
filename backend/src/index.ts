import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { globalErrorHandler } from "./utils/errorHandler.js";

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

import foodRoutes from "./routes/foods.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import orderRoutes from "./routes/orders.routes.js";

const app = express();
const PORT = process.env.PORT || 7777;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("🛑 Shutting down gracefully...");
  await mongoose.connection.close();
  process.exit(0);
});

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: "Too many requests from this IP, please try again later.",
    },
  })
);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Food Ordering API",
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
