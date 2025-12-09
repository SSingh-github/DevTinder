const URI = "mongodb+srv://sukhpreetsinghcse2023gna:cA5UzOtHABJH4GFR@cluster0.sisdk.mongodb.net/?appName=Cluster0/devTinder"
const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(URI)
}



module.exports = { connectDB }