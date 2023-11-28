import { message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetProjectById } from "../../apicalls/projects";
import { GetAllTasks } from "../../apicalls/tasks";
import Divider from "../../components/Divider";
import { SetLoading } from "../../redux/loadersSlice";
import { getDateFormat } from "../../utils/helpers";
import Members from "./Members";
import Tasks from "./Tasks";

// The code snippet provided is a functional component named ProjectInfo.
// It imports necessary dependencies and defines the component's logic and rendering.

// Here is a breakdown of the code structure:

// Import Statements: The code begins with import statements that import necessary dependencies such as
// message and Tabs from the Ant Design library, as well as various functions and components from other files.

// Component Definition: The ProjectInfo component is defined as a functional component using the function keyword.
// It initializes state variables using the useState hook and retrieves data from the Redux store using the useSelector hook.

// Data Fetching: The getData function is defined to fetch project data from an API using asynchronous requests.
// It dispatches actions to set loading state and handle success or error responses.

// useEffect Hook: The useEffect hook is used to call the getData function when the component mounts.
// This ensures that the project data is fetched and updated when the component is rendered.

// Rendering: The component's rendering logic is defined within a conditional statement.
// If the project state variable is not null, the project information is rendered using JSX.
// The project name, description, role, creation date, and creator's name are displayed.

// Tabs Component: The Tabs component from Ant Design is used to create tabs for
// displaying different sections of the project information. Two tab panes are defined:
// one for displaying tasks and another for displaying members. Each tab pane renders a corresponding component.

function ProjectInfo() {
  const [currentUserRole, setCurrentUserRole] = useState("");
  const { user } = useSelector((state) => state.users);
  const [project, setProject] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetProjectById(params.id);
      dispatch(SetLoading(false));
      if (response.success) {
        setProject(response.data);
        const currentUser = response.data.members.find(
          (member) => member.user._id === user._id
        );
        setCurrentUserRole(currentUser.role);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    project && (
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-primary text-2xl font-semibold uppercase">
              {project?.name}
            </h1>
            <span className="text-gray-600 text-sm">
              {project?.description}
            </span>
            <div className="flex gap-5">
              <span className="text-gray-600 text-sm font-semibold">Role</span>
              <span className="text-gray-600 text-sm uppercase">
                {currentUserRole}
              </span>
            </div>
          </div>
          <div>
            <div className="flex gap-5">
              <span className="text-gray-600 text-sm font-semibold">
                Created At
              </span>
              <span className="text-gray-600 text-sm">
                {getDateFormat(project.createdAt)}
              </span>
            </div>
            <div className="flex gap-5">
              <span className="text-gray-600 text-sm font-semibold">
                Created By
              </span>
              <span className="text-gray-600 text-sm">
                {project.owner.firstName} {project.owner.lastName}
              </span>
            </div>
          </div>
        </div>

        <Divider />

        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Tasks" key="1">
            <Tasks project={project} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Members" key="2">
            <Members project={project} reloadData={getData} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  );
}

export default ProjectInfo;
