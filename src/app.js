const express = require("express");

const app = express();

app.listen(7777, () => {
    console.log("the express server started successfully");
});

// routes are basically regexes, you can also write regexes here instead of path strings

app.use("/test", (req, res) => {
 res.send("Hello from the server!!");
});

// this is how you handle the query params /user?userid=10&password=12345
app.get("/user",(req, res) => {
 console.log(req.query["userid"])
console.log(req.query["password"])

 res.send({firstname: "sukhpreet", lastname: "singh"});
});

// how make the url itself dynamic, you can use ':' and get them from req.params
app.post("/user/:userid/:name/:password", (req, res) => {
    console.log(req.params)
 res.send("user data saved successfully to the database!");
});


app.delete("/user", (req, res) => {
 res.send("user data deleted successfully from the database!");
});


