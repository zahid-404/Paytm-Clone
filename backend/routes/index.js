const express = require("express");
const userRouter = require("./user.js");
const accountRouter = require("./account.js");

const rootRouter = express.Router();
rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountRouter);

module.exports = rootRouter;
