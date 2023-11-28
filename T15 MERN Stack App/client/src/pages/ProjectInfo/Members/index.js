import { Button, message, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveMemberFromProject } from "../../../apicalls/projects";
import { SetLoading } from "../../../redux/loadersSlice";
import MemberForm from "./MemberForm";

// The code is structured as follows:

// Import statements: The necessary dependencies are imported, including React, Ant Design components, and Redux hooks.
// Members component: The main function component is defined, which takes in the project and reloadData props.
// State variables: Two state variables, role and showMemberForm, are declared using the useState hook.
// Redux hooks: The useSelector hook is used to access the user object from the Redux store, and the useDispatch hook
// is used to dispatch actions.
// Helper functions: The deleteMember function is defined to remove a member from the project.
// Table columns: An array of column objects is defined to configure the table columns.
// Conditional rendering: The action column is conditionally rendered based on whether the user is the owner of the project.
// Return statement: The JSX elements are returned, including buttons, a select dropdown, and a table to display the members.
// MemberForm component: The MemberForm component is conditionally rendered when the showMemberForm state is true.

function Members({ project, reloadData }) {
  const [role, setRole] = React.useState("");
  const [showMemberForm, setShowMemberForm] = React.useState(false);
  const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const isOwner = project.owner._id === user._id;
  const deleteMember = async (memberId) => {
    try {
      dispatch(SetLoading(true));
      const response = await RemoveMemberFromProject({
        projectId: project._id,
        memberId,
      });
      if (response.success) {
        reloadData();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      render: (text, record) => record.user.firstName,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      render: (text, record) => record.user.lastName,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => record.user.email,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => record.role.toUpperCase(),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Button type="link" danger onClick={() => deleteMember(record._id)}>
          Remove
        </Button>
      ),
    },
  ];

  // if not owner, then don't show the action column
  if (!isOwner) {
    columns.pop();
  }

  return (
    <div>
      <div className="flex justify-end">
        {isOwner && (
          <Button type="default" onClick={() => setShowMemberForm(true)}>
            Add Member
          </Button>
        )}
      </div>

      <div className="w-48">
        <span>Select Role</span>
        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="">All</option>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
        </select>
      </div>

      <Table
        columns={columns}
        dataSource={project.members.filter((member) => {
          if (role === "") {
            return true;
          } else {
            return member.role === role;
          }
        })}
        className="mt-4"
      />

      {showMemberForm && (
        <MemberForm
          showMemberForm={showMemberForm}
          setShowMemberForm={setShowMemberForm}
          reloadData={reloadData}
          project={project}
        />
      )}
    </div>
  );
}

export default Members;
