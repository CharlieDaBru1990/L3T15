import { Form, Input, message, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { CreateProject, EditProject } from "../../../apicalls/projects";

// It imports necessary dependencies from the antd library, React, and Redux. The component is exported as the default export.

// The ProjectForm function takes in props (show, setShow, reloadData, project) and returns JSX code that renders
// a modal with a form inside.

// The function starts by creating a reference to the form using the useRef hook.
// It also retrieves the user object from the Redux store using the useSelector hook and initializes
// the dispatch function from the Redux store using the useDispatch hook.

// The onFinish function is an asynchronous function that is called when the form is submitted.
// It dispatches a SetLoading action to show a loading spinner, and then checks if the project prop is provided.
// If a project is provided, it means the form is being used for editing an existing project. In this case,
// the _id field is added to the values object and the EditProject API call is made. If no project is provided,
// it means the form is being used for creating a new project. In this case, the owner and members fields are added
// to the values object and the CreateProject API call is made.

// If the API call is successful, a success message is displayed using the message function from the antd library.
// The reloadData function is called to refresh the project data, and the setShow function is called to close the modal.
// If the API call fails, an error is thrown.

// Finally, the ProjectForm component returns JSX code that renders a modal with a form inside.
// The form is wrapped in the Form component from the antd library and contains two form items:
// one for the project name and one for the project description.

function ProjectForm({ show, setShow, reloadData, project }) {
  const formRef = React.useRef(null);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      let response = null;
      if (project) {
        // edit project
        values._id = project._id;
        response = await EditProject(values);
      } else {
        // create project
        values.owner = user._id;
        values.members = [
          {
            user: user._id,
            role: "owner",
          },
        ];
        response = await CreateProject(values);
      }

      if (response.success) {
        message.success(response.message);
        reloadData();
        setShow(false);
      } else {
        throw new Error(response.error);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
    }
  };
  return (
    <Modal
      title={project ? "EDIT PROJRCT" : "CREATE PROJECT"}
      open={show}
      onCancel={() => setShow(false)}
      centered
      width={700}
      onOk={() => {
        formRef.current.submit();
      }}
      okText="Save"
    >
      <Form
        layout="vertical"
        ref={formRef}
        onFinish={onFinish}
        initialValues={project}
      >
        <Form.Item label="Project Name" name="name">
          <Input placeholder="Project Name" />
        </Form.Item>
        <Form.Item label="Project Description" name="description">
          <TextArea placeholder="Project Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ProjectForm;
