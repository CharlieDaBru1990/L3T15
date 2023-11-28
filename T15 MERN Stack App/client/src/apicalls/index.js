import axios from "axios";

// In this code, we have a function called apiRequest that is used to make HTTP requests to an API using
// the Axios library in JavaScript.
// This function takes three parameters: method, url, and payload.
// It sends a request to the specified URL with the given method and payload,
// and returns the response data if the request is successful. If there is an error, it returns the error object.

export const apiRequest = async (method, url, payload) => {
  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
