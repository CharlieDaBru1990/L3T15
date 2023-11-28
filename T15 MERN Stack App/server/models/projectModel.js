// Importing the Mongoose library:
const mongoose = require("mongoose");
// Defining the Member Schema:
// we define the memberSchema using the mongoose.Schema constructor.
// It consists of two properties: user and role.
// The user property is of type mongoose.Schema.Types.ObjectId and references the "users" collection.
// The role property is of type String and is required.
const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// Defining the Project Schema:
// We then define the projectSchema using the mongoose.Schema constructor.
// It includes several properties such as name, description, status, owner, and members.
// The name and description properties are of type String and are required.
// The status property is also of type String and is required, with a default value of "active".
// The owner property is of type mongoose.Schema.Types.ObjectId and references the "users" collection.
// Finally, the members property is an array of memberSchema objects.
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    members: [memberSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("projects", projectSchema);
