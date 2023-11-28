// The code starts by requiring the "mongoose" module, which is responsible for
// connecting to the MongoDB database and performing database operations.

// Next, a new schema is defined using the mongoose.Schema constructor.
// The schema is assigned to the taskSchema variable.

// Inside the taskSchema, the fields of the task object are defined using the type property.
// Additional options such as required, default, and ref are also specified for certain fields.

// Finally, the taskSchema is exported as a model using mongoose.model.
// The model is named "tasks" and will be used to perform CRUD operations on the "tasks" collection in the MongoDB database.

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
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
      default: "pending",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    attachments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", taskSchema);
