const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const http = require("http");
const initializeSocket = require("./Utils/socket");
require("./Utils/cronJob");
require("dotenv").config();

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

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then((db) => {
    console.log("connected to the database successful");
    server.listen(process.env.PORT, () => {
      console.log("the express server started successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//https://github.com/akshaymarch7/devTinder -> repo for code reference
