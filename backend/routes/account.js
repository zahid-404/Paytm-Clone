import express from "express";
import { Account } from "../db.js";
import authMiddleware from "../middleware.js";
import mongoose from "mongoose";

const accountRouter = express.Router();

// endpoint for balance check
accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({ balance: account.balance });
});

// endpoint for transcation
accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ msg: "Insufficient balance" });
  }
  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ msg: "Account not found" });
  }

  // perform transaction
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // commit transaction
  await session.commitTransaction();
  res.status(200).json({ msg: "Transaction successful" });
});
export default accountRouter;
