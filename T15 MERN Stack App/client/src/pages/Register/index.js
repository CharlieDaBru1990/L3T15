import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetButtonLoading } from "../../redux/loadersSlice";
import { getAntdFormInputRules } from "../../utils/helpers";

// The code is structured as a functional component named "Register".
// It imports necessary dependencies and defines the component's logic and UI elements.
// Here is a breakdown of the code structure:

// Import Statements: The code imports necessary dependencies such as React, Ant Design components, React Router, and Redux.

// Functional Component: The code defines a functional component named "Register" using the arrow function syntax.
// This component represents the user registration form.

// State and Dispatch Hooks: The component uses React hooks to access the application's state and dispatch actions.
// It uses the useSelector hook to retrieve the buttonLoading state from the Redux store and the
// useDispatch hook to dispatch actions.

// Form Submission Handler: The component defines an onFinish function that is called when the form is submitted.
// Inside this function, the component dispatches a SetButtonLoading action to set the buttonLoading state to true.
// It then calls the RegisterUser function (not shown in the code) to send the registration data to the server.
// If the registration is successful, a success message is displayed, and the user is redirected to the login page.
// If there is an error, an error message is displayed.

// useEffect Hook: The component uses the useEffect hook to check if the user is already logged in.
// If the user has a valid token stored in the local storage, they are redirected to the home page.

// UI Elements: The component renders the UI elements using JSX syntax.
// It includes a header section with a title and description,
// a form section with input fields for first name, last name, email, and password, a submit button,
// and a link to the login page.

function Register() {
  const navigate = useNavigate();
  const { buttonLoading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetButtonLoading(true));
      const response = await RegisterUser(values);
      dispatch(SetButtonLoading(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
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
      navigate("/");
    }
  }, []);

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
          <h1 className="text-2xl text-gray-700 uppercase">
            Lets get you started
          </h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={getAntdFormInputRules}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={getAntdFormInputRules}
            >
              <Input />
            </Form.Item>
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
              {buttonLoading ? "Loading" : "Register"}
            </Button>

            <div className="flex justify-center mt-5">
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
