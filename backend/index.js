import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";

const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/api/v1", (req, res) => {
  res.json({ msg: "Hello from the server" });
});

if (!process.env.MONGODB_URI) {
  console.error(
    "MONGODB_URI is not defined. Please define it in the .env file."
  );
  process.exit(1);
}
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
