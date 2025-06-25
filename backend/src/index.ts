import express from "express";
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
const PORT = process.env.PORT;

app.use("/auth", authRoutes);
app.use("/food", foodRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

app.get("/", (_req, res) => {
  res.send("Where is the WORD");
  console.log("Response sent");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
