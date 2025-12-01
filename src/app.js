const express = require("express");
const {adminAuth} = require("./middlewares/auth");

const app = express();

app.listen(7777, () => {
    console.log("the express server started successfully");
});


// in this way you can exclude the routes from middlewares
app.post("/admin/login", (req, res) => {
    res.send("admin logged in successfully");
});

// this is known as the middleware, which will be called before any admin route is called
app.use("/admin", adminAuth);


app.get("/admin/getAllData", (req, res) => {
    // check the authorization here
    res.send("this is all the data for admin");
});


app.get("/admin/getNewUsers", (req, res) => {
    // check the authorization here
    res.send("this is the new users data for admin");
});
