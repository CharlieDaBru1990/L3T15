import { apiRequest } from ".";

// CreateTask(task): This function is used to create a new task.
// It takes a task object as a parameter, which contains the necessary information for creating the task.
// The function makes a POST request to the /api/tasks/create-task endpoint with the task data.
export const CreateTask = async (task) =>
  apiRequest("post", "/api/tasks/create-task", task);

//  GetAllTasks(filters): This function retrieves all tasks based on the provided filters.
//  The filters parameter is an object that can be used to specify criteria for filtering the tasks.
//  The function makes a POST request to the /api/tasks/get-all-tasks endpoint with the filter data.
export const GetAllTasks = async (filters) =>
  apiRequest("post", "/api/tasks/get-all-tasks", filters);

// UpdateTask(task): This function is used to update an existing task.
// It takes a task object as a parameter, which contains the updated information for the task.
// The function makes a POST request to the /api/tasks/update-task endpoint with the updated task data.
export const UpdateTask = async (task) =>
  apiRequest("post", "/api/tasks/update-task", task);

// DeleteTask(id): This function deletes a task based on its ID.
// The id parameter represents the unique identifier of the task.
// The function makes a POST request to the /api/tasks/delete-task endpoint with the task ID.
export const DeleteTask = async (id) =>
  apiRequest("post", "/api/tasks/delete-task", { _id: id });

// UploadImage(payload): This function is responsible for uploading an image associated with a task.
// The payload parameter contains the image data to be uploaded.
// The function makes a POST request to the /api/tasks/upload-image endpoint with the image payload.
export const UploadImage = async (payload) => {
  return apiRequest("post", "/api/tasks/upload-image", payload);
};
