const { apiRequest } = require(".");

// CreateProject: This function is used to create a new project.
// It takes in a project object as a parameter and makes a POST request to the /api/projects/create-project endpoint.
export const CreateProject = async (project) =>
  apiRequest("post", "/api/projects/create-project", project);

// GetAllProjects: This function retrieves all projects based on the provided filters.
// It takes in a filters object as a parameter and makes a POST request to the /api/projects/get-all-projects endpoint.
export const GetAllProjects = async (filters) =>
  apiRequest("post", "/api/projects/get-all-projects", filters);

// GetProjectById: This function retrieves a project by its ID.
// It takes in an id parameter and makes a POST request to the /api/projects/get-project-by-id endpoint.
export const GetProjectById = async (id) =>
  apiRequest("post", "/api/projects/get-project-by-id", { _id: id });

// EditProject: This function is used to edit an existing project.
// It takes in a project object as a parameter and makes a POST request to the /api/projects/edit-project endpoint.
export const EditProject = async (project) =>
  apiRequest("post", "/api/projects/edit-project", project);

// DeleteProject: This function deletes a project based on its ID.
// It takes in an id parameter and makes a POST request to the /api/projects/delete-project endpoint.
export const DeleteProject = async (id) =>
  apiRequest("post", "/api/projects/delete-project", { _id: id });

// GetProjectsByRole: This function retrieves projects based on the user's role.
// It takes in a userId parameter and makes a POST request to the /api/projects/get-projects-by-role endpoint.
export const GetProjectsByRole = async (userId) =>
  apiRequest("post", "/api/projects/get-projects-by-role", { userId });

// AddMemberToProject: This function adds a member to a project.
// It takes in a data object as a parameter and makes a POST request to the /api/projects/add-member endpoint.
export const AddMemberToProject = async (data) =>
  apiRequest("post", "/api/projects/add-member", data);

// RemoveMemberFromProject: This function removes a member from a project.
// It takes in a data object as a parameter and makes a POST request to the /api/projects/remove-member endpoint.
export const RemoveMemberFromProject = async (data) =>
  apiRequest("post", "/api/projects/remove-member", data);
