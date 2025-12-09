const express = require("express");
const {adminAuth} = require("./middlewares/auth");
const {connectDB} = require("./config/database");

const app = express();



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
