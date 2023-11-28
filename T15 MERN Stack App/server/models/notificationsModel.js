// The code begins by importing the mongoose library, which is required to define and interact with the MongoDB database.
// Next, we define the notificationsSchema using the mongoose.Schema constructor.

// Inside the schema definition, we specify the fields that make up a notification. Here are the key fields:

// user: This field represents the user associated with the notification.
// It is of type mongoose.Schema.Types.ObjectId and references the "users" collection in the database.
// title: This field stores the title of the notification. It is of type String and is required, meaning it must have a value.
// description: This field holds the description of the notification. It is also of type String and is required.
// onClick: This field stores the action to be performed when the notification is clicked. It is of type String and is required.
// read: This field represents whether the notification has been read or not. It is of type Boolean and has a default value of false.
// Additionally, we provide an options object as the second argument to the mongoose.Schema constructor. In this case, we set the timestamps option to true, which automatically adds createdAt and updatedAt fields to the schema.

// Finally, we export the notifications schema as a model using mongoose.model. This allows us to create, read, update, and delete notifications using the defined schema.

const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    onClick: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notifications", notificationsSchema);
