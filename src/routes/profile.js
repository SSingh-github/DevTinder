const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateUserPatchData, validatePasswordPatchData} = require("../Utils/validation");
const {User} = require("../models/user");
const bcrypt = require("bcrypt");


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
    
    try {
        validateUserPatchData(req);
        const user = await User.findByIdAndUpdate(_id, req.body);
        res.send("user updated successfully");
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while updating the user")
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {

    const user = req.user;
    const body = req.body;
    
    try {
        validatePasswordPatchData(req);
        const {oldPassword, newPassword} = req.body;
        
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
       
        if(isPasswordValid) {
            
            const bothPasswordsAreSame = await bcrypt.compare(newPassword, user.password);
            if(bothPasswordsAreSame) {
                throw new Error("passwords should be different");
            }

            const passwordHash = await bcrypt.hash(newPassword, 10);
            user.password = passwordHash;
            await user.save();
            res.send("password updated successfully");
        } else {
            throw new Error("Invalid old password");
        }
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while updating the password")
    }
});

module.exports = profileRouter;