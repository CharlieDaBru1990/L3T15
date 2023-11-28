require("dotenv").config();

console.log("MongoDB URI:", process.env.mongo_url);

const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo db connected successfully");
});

db.on("error", (err) => {
  console.error("Mongo db connection error:", err);
});

// Export the db object for use in your application
module.exports = db;
