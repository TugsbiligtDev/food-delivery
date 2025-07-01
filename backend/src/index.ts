import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import foodRoutes from "./routes/foods.route.js";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import orderRoutes from "./routes/order.route.js";

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI as string);

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.use("/auth", authRoutes);
app.use("/food", foodRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

app.get("/", (_req, res) => {
  res.send("Be your best");
  console.log("Response sent");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
