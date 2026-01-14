const express = require("express");
const authRouter = express.Router();
const {validateUserSignupData} = require("../Utils/validation");
const bcrypt = require("bcrypt");
const {User} = require("../models/user");
const jwt = require("jsonwebtoken");



authRouter.post("/signup", async (req, res) => {
    try {
        validateUserSignupData(req);

        const {firstName, lastName, email, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        console.log(passwordHash);

        const user = new User({
            firstName,
            lastName,
            email, 
            password: passwordHash
        });
        await user.save();
        res.send("user saved successfully");
        console.log("user saved successfully");
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while saving the user")
    }

});

authRouter.post("/login", async (req, res) => {
    try {

        const {email, password} = req.body;
        // check if user is present in the db
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            const token = await jwt.sign({_id: user._id}, "DEVTINDER", { expiresIn : 60});
            // send the token inside the cookie here
            res.cookie("token", token);
            res.send("Login successfull");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while saving the user")
    }

});

module.exports = authRouter;