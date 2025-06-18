import express from "express";

import foodRoutes from "./routes/food.route";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import orderRoutes from "./routes/order.route.js";

import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://Tugs:KXYhSg2Srp2M6lhW@cluster0.t01lldi.mongodb.net/food-delivery"
);

const app = express();
app.use(express.json());
const port = "3000";

app.use("/auth", authRoutes);
app.use("/food", foodRoutes);
app.use("/food-category", categoryRoutes);
app.use("/food-order", orderRoutes);

app.get("/", (_req, res) => {
  res.send("It's working");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//KXYhSg2Srp2M6lhW password
