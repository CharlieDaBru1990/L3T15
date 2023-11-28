// Importing Mongoose: The code begins by importing the Mongoose library using the require function.
// This allows us to use Mongoose in our code.

// Defining the User Schema: The userSchema variable is assigned a new instance of the mongoose.Schema class.
// Inside the schema definition, we define the fields for a user document.

// Field Definitions: Each field in the schema is defined using an object literal.
// The field name (e.g., firstName, lastName, email, password) is used as the key,
// and the value is an object that specifies the field's type and any additional options.

// Field Types: In this code, all the fields (firstName, lastName, email, password) are of type String.
// This means that the values stored in these fields will be strings.

// Additional Field Options: The required option is set to true for all fields,
// indicating that these fields must have a value when creating a new user document.
// The trim option is set to true for the email field, which removes any leading or trailing whitespace from the input.
// The unique option is set to true for the email field, ensuring that each email address is unique within the collection.

// Timestamps: The { timestamps: true } option is passed as the second argument to the mongoose.Schema constructor.
// This option automatically adds createdAt and updatedAt fields to the user documents,
// storing the creation and last update timestamps respectively.

// Exporting the User Model: The userSchema is passed to the mongoose.model function along with the collection name "users".
// This creates a model named "users" based on the user schema. The model can be used to perform CRUD operations on
// the "users" collection in MongoDB.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
