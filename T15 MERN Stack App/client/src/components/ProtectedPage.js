import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUser } from "../apicalls/users";
import { SetNotifications, SetUser } from "../redux/usersSlice";
import { SetLoading } from "../redux/loadersSlice";
import { GetAllNotifications } from "../apicalls/notifications";
import { Avatar, Badge, Space } from "antd";
import Notifications from "./Notifications";

// The code starts with importing necessary dependencies and components.
// It then defines the ProtectedPage function component.
// Inside the component, there are several hooks and variables declared using
// the useState, useDispatch, and useSelector hooks provided by React Redux.

// The component also defines two asynchronous functions: getUser and getNotifications.
// These functions are responsible for fetching the logged-in user's data and the notifications for the user, respectively.
// They make API calls using functions from the apicalls module.

// The component uses the useEffect hook to call the getUser function when the component mounts.
// If the user is not logged in, the user will be redirected to the login page using the navigate function from React Router.

// Another useEffect hook is used to call the getNotifications function whenever the user state changes.
// This ensures that the notifications are fetched whenever the user data is available.

// The component returns the protected page content wrapped in a conditional rendering.
// If the user state is truthy (i.e., the user is logged in), the content is rendered. Otherwise, nothing is rendered.

// The protected page content includes a header with the application name, the user's first name,
// a badge showing the number of unread notifications, and a logout button.
// It also renders the children prop, which represents the content specific to the protected page.

// Finally, the component conditionally renders the Notifications component if
// the showNotifications state is true. This component is responsible for displaying the notifications in a modal.

function ProtectedPage({ children }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, notifications } = useSelector((state) => state.users);
  const getUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetLoggedInUser();
      dispatch(SetLoading(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const getNotifications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllNotifications();
      dispatch(SetLoading(false));
      if (response.success) {
        dispatch(SetNotifications(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      getNotifications();
    }
  }, [user]);

  return (
    user && (
      <div>
        <div className="flex justify-between items-center bg-primary text-white px-5 py-4">
          <h1 className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
            CP Project Tracker Pro
          </h1>

          <div className="flex items-center bg-white px-5 py-2 rounded">
            <span
              className=" text-primary cursor-pointer underline mr-2"
              onClick={() => navigate("/profile")}
            >
              {user?.firstName}
            </span>
            <Badge
              count={
                notifications.filter((notification) => !notification.read)
                  .length
              }
              className="cursor-pointer"
            >
              <Avatar
                shape="square"
                size="large"
                icon={
                  <i className="ri-notification-line text-white rounded-full"></i>
                }
                onClick={() => {
                  setShowNotifications(true);
                }}
              />
            </Badge>

            <i
              className="ri-logout-box-r-line ml-10 text-primary"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="px-5 py-3">{children}</div>

        {showNotifications && (
          <Notifications
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            reloadNotifications={getNotifications}
          />
        )}
      </div>
    )
  );
}

export default ProtectedPage;
