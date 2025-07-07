import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
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
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
//* Something went wrong — stop the program!
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: "Too many requests" },
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many authentication attempts" },
});
// app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
// app.use(limiter);
// app.use("/auth", authLimiter);
connectDB();
//* separate backend (code) from the frontend (pages)
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
//*This route is just a ping or checkup.
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});
//*To show: “My backend is working
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Food Ordering API",
    version: "1.0.0",
  });
});
//*If someone goes to a wrong URL, show error
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation error",
      errors: Object.values(err.errors).map((e) => e.message),
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
