const express = require("express");
const {adminAuth} = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const {User} = require("./models/user")

const app = express();

app.post("/signup", async (req, res) => {

    const user = new User({
        firstName: "dummy",
        lastName: "user"
    });

    try {
        await user.save();
        res.send("user saved successfully");
        console.log("user saved successfully");
    } catch (err) {
        res.status(400).send("error while saving user");
        console.log("error while saving the user")
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
