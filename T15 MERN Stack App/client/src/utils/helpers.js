import moment from "moment";

// Antd Form Input Rules
// Antd (Ant Design) is a popular UI library for React that provides a set of high-quality components.
// One of the key components in Antd is the Form component, which allows developers to create forms easily.
// Antd Form Input Rules are used to define validation rules for form inputs.
// These rules ensure that the user enters valid data before submitting the form.

// Date Formatting
// Date formatting is the process of converting a date object into a specific format.
// JavaScript provides the Date object to work with dates, but formatting the date in a desired format can be challenging.
// Luckily, there are libraries available, such as Moment.js, that simplify the process of formatting dates.

// The code consists of two parts: Antd Form Input Rules and a Date Formatting function.

// The Antd Form Input Rules are defined as an array of objects.
// Each object represents a rule and has two properties: required and message.
// The required property is set to true, indicating that the input is mandatory.
// The message property contains the error message that will be displayed if the input is not provided.

// The Date Formatting function is a named export called getDateFormat.
// It takes a date parameter and uses the Moment.js library to format the date. The formatted date is returned as a string.

export const getAntdFormInputRules = [
  {
    required: true,
    message: "Required",
  },
];

export const getDateFormat = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm A");
};
