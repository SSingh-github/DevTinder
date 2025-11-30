const express = require("express");

const app = express();

app.listen(7777, () => {
    console.log("the express server started successfully");
});

app.use("/test", (req, res) => {
 res.send("Hello from the server!!");
});

app.get("/user",(req, res) => {
 res.send({firstname: "sukhpreet", lastname: "singh"});
});

app.post("/user", (req, res) => {
 res.send("user data saved successfully to the database!");
});


app.delete("/user", (req, res) => {
 res.send("user data deleted successfully from the database!");
});


