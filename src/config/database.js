const URI = process.env.DB_CONNECTION_SECRET;
const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(URI, { dbName: "devtinder" });
}

module.exports = { connectDB };
