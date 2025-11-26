const express = require("express");

const app = express();

app.listen(7777, () => {
    console.log("the express server started successfully");
});

app.use("/test", (req, res) => {
 res.send("Hello from the server!!");
});


app.use("/namaste", (req, res) => {
 res.send("namaste!!!");
});



