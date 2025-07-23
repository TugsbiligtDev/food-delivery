import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import foodRoutes from "./routes/foods.route.js";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import orderRoutes from "./routes/order.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json({ limit: "10mb" }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Food Ordering API",
    version: "1.0.0",
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err: any, req: Request, res: Response): void => {
  console.error("Global error:", err);

  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation error",
      errors: Object.values(err.errors).map((e: any) => e.message),
    });
  } else if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  } else if (err.code === 11000) {
    res.status(409).json({
      success: false,
      message: "Duplicate field value",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
