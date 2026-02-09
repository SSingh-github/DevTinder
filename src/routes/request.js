const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const { User } = require("../models/user");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      // check if the touser exists in the db or not
      const user = await User.findById(toUserId);
      if (!user) {
        throw new Error("the user does not exists");
      }
      // validate that status only has 2 values, interested, ignored
      const allowed_status = ["interested", "ignored"];
      if (!allowed_status.includes(status)) {
        throw new Error("Invalid status passed in the url");
      }
      // check if there is a same users request already in the db
      // what if there is request already, toUser tries to send request to from userId
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("Connection request already exists");
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("you cannot send connection request to yourself");
      }
      const data = await connectionRequest.save();

      res.json({
        message: "connection request sent successfully",
        data,
      });
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowed_status = ["accepted", "rejected"];
      if (!allowed_status.includes(status)) {
        return res.status(400).send("invalid status");
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser,
        status: "interested",
      });

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "success", data: data });
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  },
);

module.exports = requestRouter;
