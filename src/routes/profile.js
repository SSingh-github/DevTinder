const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateUserPatchData} = require("../Utils/validation");
const {User} = require("../models/user");


profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while saving the user")
    }

});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

    const {_id} = req.user;
    validateUserPatchData(req);
    try {
        const user = await User.findByIdAndUpdate(_id, req.body);
        res.send("user updated successfully");
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while updating the user")
    }
});

module.exports = profileRouter;