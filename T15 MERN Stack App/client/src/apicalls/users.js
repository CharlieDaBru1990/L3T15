const { apiRequest } = require(".");

// RegisterUser: This function is responsible for registering a new user.
// It takes a payload object as an argument, which contains the user's information,
// such as username, email, and password.
// It makes a POST request to the /api/users/register endpoint with the payload data.
export const RegisterUser = async (payload) =>
  apiRequest("post", "/api/users/register", payload);

// LoginUser: This function is used for user login.
// It also takes a payload object as an argument, which contains the user's credentials,
// such as username and password.
// It makes a POST request to the /api/users/login endpoint with the payload data.
export const LoginUser = async (payload) =>
  apiRequest("post", "/api/users/login", payload);

// GetLoggedInUser: This function retrieves the currently logged-in user.
// It makes a GET request to the /api/users/get-logged-in-user endpoint.
export const GetLoggedInUser = async () =>
  apiRequest("get", "/api/users/get-logged-in-user");
