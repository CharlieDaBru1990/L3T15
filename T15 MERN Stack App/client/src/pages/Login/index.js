import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetButtonLoading } from "../../redux/loadersSlice";
import { getAntdFormInputRules } from "../../utils/helpers";

// Import statements: The code imports the necessary dependencies and components from various libraries.

// Login function: The Login function is a React component that represents the login page.
// It is defined as a functional component using the function keyword.

// State and dispatch: The code uses the useSelector hook from Redux to access the buttonLoading state from the Redux store.
// It also uses the useDispatch hook to dispatch actions to update the state.

// Form submission: The onFinish function is called when the form is submitted.
// It dispatches an action to set the buttonLoading state to true, sends a request to the server to log in the
// user using the LoginUser function, and handles the response accordingly.

// useEffect hook: The useEffect hook is used to check if the user is already logged in.
// If the user has a valid token stored in the local storage, they are redirected to the home page.

// JSX code: The return statement in the Login function returns JSX code that represents the login page.
// It includes a grid layout with two columns. The left column displays a heading and a description of the application.
// The right column contains the login form.

/* The `Login` function is a React component that represents the login page of an application. */
function Login() {
  const { buttonLoading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetButtonLoading(true));
      const response = await LoginUser(values);
      dispatch(SetButtonLoading(false));
      if (response.success) {
        localStorage.setItem("token", response.data);
        message.success(response.message);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetButtonLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  /* The `return` statement in the `Login` function is returning JSX code that represents the login
  page of an application. */
  return (
    <div className="grid grid-cols-2">
      <div className="bg-primary h-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-7xl text-white">CP Project Tracker Pro</h1>
          <span className=" text-white mt-5">
            Efficiency Unleashed: Navigate Your Projects, Master Your Tasks
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[420px]">
          <h1 className="text-2xl text-gray-700">LOGIN TO YOUR ACCOUNT</h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={getAntdFormInputRules}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={getAntdFormInputRules}
            >
              <Input type="password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={buttonLoading}
            >
              {buttonLoading ? "Loading" : "Login"}
            </Button>

            <div className="flex justify-center mt-5">
              <span>
                Don't have an account? <Link to="/register">Register</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
