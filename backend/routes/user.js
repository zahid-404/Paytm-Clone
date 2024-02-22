import express from "express";
import { User, Account } from "../db.js";
import authMiddleware from "../middleware.js";
import zod from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const userRouter = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6),
});

// signup route
userRouter.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(401).json({ msg: "Invalid inputs" });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(401).json({ msg: "User already exists" });
  }

  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.json({ msg: "User created successfully", token: token });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

// signIn route
userRouter.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(401).json({ msg: "Invalid inputs" });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.json({ token: token });
  }

  res.status(401).json({ msg: "Error while logging in" });
});

// update route
const updateBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

userRouter.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(401).json({ msg: "Error while updating the information" });
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
  res.json({ msg: "Updated successfully" });
});

// find users
userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
export default userRouter;
