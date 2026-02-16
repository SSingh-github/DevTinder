const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then((db) => {
    console.log("connected to the database successful");
    app.listen(7777, () => {
      console.log("the express server started successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
