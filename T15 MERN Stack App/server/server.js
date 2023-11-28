const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 4000;

const usersRoute = require("./routes/usersRoute");
const projectsRoute = require("./routes/projectsRoute");
const tasksRoute = require("./routes/tasksRoute");
const notificationsRoute = require("./routes/notifcationsRoute");

app.use("/api/users", usersRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/notifications", notificationsRoute);

// deployment config
const path = require("path");
const __dirnamePath = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirnamePath, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirnamePath, "client", "build", "index.html"));
  });
}

// Cloudinary configuration check
console.log("Cloudinary Config (Before):", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary
const { v2: cloudinary } = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Config (After):", cloudinary.config());

let serverInstance = app.listen(port, () =>
  console.log(`Node JS server listening on port ${port}`)
);

module.exports = { app, serverInstance };
