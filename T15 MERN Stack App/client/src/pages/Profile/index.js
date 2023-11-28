import React from "react";
import { Tabs } from "antd";
import Projects from "./Projects";

// The code provided defines a functional component called "Profile". This component renders a set of
// tabs using the "Tabs" component from the "antd" library. Each tab represents a different section of the user's profile.

function Profile() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Projects" key="1">
        <Projects />
      </Tabs.TabPane>
      <Tabs.TabPane tab="General" key="2">
        General
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Profile;
