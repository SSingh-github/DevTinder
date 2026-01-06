const express = require("express");
const {adminAuth} = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const {User} = require("./models/user")

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        res.send("user saved successfully");
        console.log("user saved successfully");
    } catch (err) {
        res.status(400).send("error while saving user");
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
        const ALLOWED_KEYS = ["photoUrl", "about", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_KEYS.includes(k));
        if(!isUpdateAllowed) {
            throw new Error("Invalid data, update not allowed");
        }
        if(data.skills?.length > 10) {
            throw new Error("10 skills are allowed at max");
        }
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

/*
TODO:- 

Difference between patch and put
Api - update a user
Explore the mongoose documentation for model methods
What are options in a model.findoneandudpate method, explore more about it
Api - update the user with email id


Explore schematype options from the documentation
Add required, unique, lowercase, min, min length, trim
Add default
Create a custom validate function for gender
Improve the db schema - put all appropriate validations on each field in schema
Add timestamps to the user schema
Add api level validation on patch request and signup post api
DATA sanitizing - add api validation for each field
Install validator
Explore validator library function and user validator functions for password, email
NEVER TRUST req.bodyvalidate data in signup api
Install bcrypt package
Create password hash using bcrypt.hash and save the user with encrypted password
Create login api
Compare passwords and throw errors if email or password is invalid

Install cookie-parser
Just send a dummy cookie to user and test in postman
Create GET / profile api and check if you get the cookie back
Install jsonwebtoken
In login api, after email and password validation, create a JWT token and send it to user in cookies
Read the cookies inside your profile api and find the logged in user
userAuth middleware
Add the userAuth middleware in profile api and a new sendconnectionrequest api
Set the expiry of JWT token and cookies for 7 days
Create user schema method to getJWT()
Create user schema method to comparepassword(password)
*/