const { apiRequest } = require(".");

// AddNotification(notification)

// This function is used to add a new notification.
// It takes a notification object as a parameter, which contains the necessary information for the notification.
// The function makes a POST request to the /api/notifications/add-notification endpoint, passing the notification
// object as the request payload.
export const AddNotification = async (notification) =>
  apiRequest("post", "/api/notifications/add-notification", notification);

// GetAllNotifications()

// This function retrieves all notifications.
// It makes a GET request to the /api/notifications/get-all-notifications endpoint.
// The function returns a promise that resolves to an array of notifications.

export const GetAllNotifications = async () =>
  apiRequest("get", "/api/notifications/get-all-notifications");

// MarkNotificationAsRead(id)

// This function marks a notification as read.
// It takes the id of the notification as a parameter.
// The function makes a POST request to the /api/notifications/mark-as-read endpoint, passing the id as the request payload.

export const MarkNotificationAsRead = async (id) =>
  apiRequest("post", "/api/notifications/mark-as-read");

// DeleteAllNotifications()

// This function deletes all notifications.
// It makes a DELETE request to the /api/notifications/delete-all-notifications endpoint.
// The function returns a promise that resolves when the deletion is successful.

export const DeleteAllNotifications = async () =>
  apiRequest("delete", "/api/notifications/delete-all-notifications");
