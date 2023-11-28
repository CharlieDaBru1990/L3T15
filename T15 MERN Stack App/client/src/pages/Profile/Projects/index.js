import { Button, message, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProject, GetAllProjects } from "../../../apicalls/projects";
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat } from "../../../utils/helpers";
import ProjectForm from "./ProjectForm";

// The Projects component is a functional component that uses React hooks to manage state and side effects.
// It imports the necessary dependencies from the Ant Design library, React, and Redux.

// The component defines several state variables using the useState hook:

// selectedProject: Stores the currently selected project.
// projects: Stores the list of projects fetched from the API.
// show: Controls the visibility of the project form.
// The component also uses the useSelector and useDispatch hooks from Redux to access the user state and dispatch actions, respectively.

// The component defines two helper functions:

// getData: Fetches the projects data from the API and updates the projects state variable.
// onDelete: Deletes a project by its ID and updates the projects state variable.
// The component uses the useEffect hook to fetch the projects data when the component mounts.

// The component defines a columns array that specifies the columns of the table. Each column has a title, dataIndex,
// and optional render function for custom rendering.

// The component renders a button to add a new project and a table to display the projects.
// If the show state variable is true, it renders the ProjectForm component.

function Projects() {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [projects, setProjects] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllProjects({ owner: user._id });
      if (response.success) {
        setProjects(response.data);
      } else {
        throw new Error(response.error);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const onDelete = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteProject(id);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.error);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-4">
            <i
              class="ri-delete-bin-line"
              onClick={() => onDelete(record._id)}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedProject(record);
                setShow(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="default"
          onClick={() => {
            setSelectedProject(null);
            setShow(true);
          }}
        >
          Add Project
        </Button>
      </div>
      <Table columns={columns} dataSource={projects} className="mt-4" />
      {show && (
        <ProjectForm
          show={show}
          setShow={setShow}
          reloadData={getData}
          project={selectedProject}
        />
      )}
    </div>
  );
}

export default Projects;
