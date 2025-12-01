const express = require("express");

const app = express();

app.listen(7777, () => {
    console.log("the express server started successfully");
});

// routes are basically regexes, you can also write regexes here instead of path strings

app.use("/test", (req, res) => {
 res.send("Hello from the server!!");
});

// you can pass as many route handlers in the function arguments as you want
// to call the next handler just using "next()" function. 
// you can also add them in an array here like app.get("/user", rh1, rh2, [rh3, rh4], rh5)
// just remember to call at the right place s
app.get("/user",
    (req, res, next) => {

 //res.send({firstname: "sukhpreet", lastname: "singh"})
 console.log("this is the first route handler");
 next();
},

    (req, res) => {
 res.send({firstname: "sukhpreet", lastname: "singh"});
}


 );

// how make the url itself dynamic, you can use ':' and get them from req.params
app.post("/user/:userid/:name/:password", (req, res) => {
    console.log(req.params)
 res.send("user data saved successfully to the database!");
});


app.delete("/user", (req, res) => {
 res.send("user data deleted successfully from the database!");
});


