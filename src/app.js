const express = require("express");
const {userAuth} = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const {User} = require("./models/user");
const {validateUserPatchData, validateUserSignupData} = require("./Utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
    try {

        const {email, password} = req.body;
        // check if user is present in the db
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            const token = await jwt.sign({_id: user._id}, "DEVTINDER");
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

app.get("/profile", userAuth, async (req, res) => {

    try {
    //     const {token} = req.cookies;
    //     if(!token) {
    //         throw new Error("invalid token");
    //     }
    //     console.log(token);
    //     const {_id} = await jwt.verify(token, "DEVTINDER");
        
    //     const user = await User.findById(_id);
    //     if(!user) {
    //         throw new Error("invalid token");
    //     }

    //    res.send(user);
    res.send("user found success");
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while saving the user")
    }

});

app.get("/user", async (req, res) => {

    const {email} = req.body;

    try {
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error("User not found with this email address")
        }
        res.send(user);
        console.log(user);
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while saving the user")
    }

});

app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        console.log(users);
        res.send(users);
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while saving the user")
    }

});

app.get("/user/:userId", async (req, res) => {

    const {userId} = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("user with given id not found");
        }
        console.log(user);
        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while saving the user" + err)
    }

});

app.delete("/user/:userId", async (req, res) => {

    const {userId} = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("user with given id not found");
        }
        res.send("user deleted successfully");
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while saving the user" + err)
    }

});

app.patch("/user/:userId", async (req, res) => {
    const data = req.body;
    const {userId} = req.params;
    try {
        validateUserPatchData(req);
        const user = await User.findByIdAndUpdate(userId, data, {runValidators: true});
        res.send("user updated successfully");
    } catch (err) {
        res.status(400).send("Error: " + err);
        console.log("error while updating the user")
    }

});

connectDB()
.then ( db => {
    console.log("connected to the database successful")
    app.listen(7777, () => {
    console.log("the express server started successfully");
});
})
.catch (err => {
    console.log(err)
})

