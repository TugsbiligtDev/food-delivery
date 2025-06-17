import express from "express";

import authRouter from "./routes/authentication.route.js";

const app = express();
app.use(express.json());
const port = "3000";

app.use("/auth", authRouter);

app.get("/", (_req, res) => {
  res.send("Hello Me!");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
