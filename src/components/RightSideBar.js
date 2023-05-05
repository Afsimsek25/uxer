import React, { useState } from "react";
import { Button, Layout, Menu, Space } from "antd";
import { RightOutlined, LeftOutlined,AndroidOutlined,
    AppleOutlined,
    WindowsOutlined,
    SearchOutlined, } from "@ant-design/icons";
import "./RightSideBar.css";
import JobCard from "./JobCard";

const { Sider } = Layout;

const RightSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const jobs = [
    {
      id: "9b52f1c1-4f5a-48c5-8f48-de4df470f9ef",
      name: "job1 bus",
      description: "Dolore aperiam enim sit.",
      cron: "0 1 * * *",
      runParallel: true,
      numOfRunIfFails: 999,
      isActive: true,
      agentId: "00000000-0000-0000-0000-000000000000",
      tests: ["Test A", "Test B", "Test C"],
    },
    {
      id: "5e34d2e4-4a4a-46c6-8e53-ec5f5ed5ef3c",
      name: "job2 bus",
      description: "Dolore aperiam enim sit.",
      cron: "0 1 * * *",
      runParallel: false,
      numOfRunIfFails: 999,
      isActive: true,
      agentId: "00000000-0000-0000-0000-000000000000",
      tests: ["Test 1", "Test 2", "Test 3","Test 4", "Test 5", "Test 6"],
    },
    {
      id: "8b7c8731-0d95-44db-9d8e-3c9f9a76fb72",
      name: "job3 bus",
      description: "Dolore aperiam enim sit.",
      cron: "0 1 * * *",
      runParallel: false,
      numOfRunIfFails: 999,
      isActive: true,
      agentId: "00000000-0000-0000-0000-000000000000",
      tests: ["Test X", "Test Y", "Test Z","Test W"],
    },
    {
        id: "9b52f1c1-4f5a-48c5-8f48-de4df470f9ef",
        name: "job1 bus",
        description: "Dolore aperiam enim sit.",
        cron: "0 1 * * *",
        runParallel: true,
        numOfRunIfFails: 999,
        isActive: true,
        agentId: "00000000-0000-0000-0000-000000000000",
        tests: ["Test A", "Test B", "Test C"],
      },
      {
        id: "5e34d2e4-4a4a-46c6-8e53-ec5f5ed5ef3c",
        name: "job2 bus",
        description: "Dolore aperiam enim sit.",
        cron: "0 1 * * *",
        runParallel: false,
        numOfRunIfFails: 999,
        isActive: true,
        agentId: "00000000-0000-0000-0000-000000000000",
        tests: ["Test 1", "Test 2", "Test 3","Test 4", "Test 5", "Test 6"],
      },
      {
        id: "8b7c8731-0d95-44db-9d8e-3c9f9a76fb72",
        name: "job3 bus",
        description: "Dolore aperiam enim sit.",
        cron: "0 1 * * *",
        runParallel: false,
        numOfRunIfFails: 999,
        isActive: true,
        agentId: "00000000-0000-0000-0000-000000000000",
        tests: ["Test X", "Test Y", "Test Z","Test W"],
      },
      {
        id: "9b52f1c1-4f5a-48c5-8f48-de4df470f9ef",
        name: "job1 bus",
        description: "Dolore aperiam enim sit.",
        cron: "0 1 * * *",
        runParallel: true,
        numOfRunIfFails: 999,
        isActive: true,
        agentId: "00000000-0000-0000-0000-000000000000",
        tests: ["Test A", "Test B", "Test C"],
      },
      {
        id: "9b52f1c1-4f5a-48c5-8f48-de4df470f9ef",
        name: "job1 bus",
        description: "Dolore aperiam enim sit.",
        cron: "0 1 * * *",
        runParallel: true,
        numOfRunIfFails: 999,
        isActive: true,
        agentId: "00000000-0000-0000-0000-000000000000",
        tests: ["Test A", "Test B", "Test C"],
      },
      {
        id: "8b7c8731-0d95-44db-9d8e-3c9f9a76fb72",
        name: "job3 bus",
        description: "Dolore aperiam enim sit.",
        cron: "0 1 * * *",
        runParallel: false,
        numOfRunIfFails: 999,
        isActive: true,
        agentId: "00000000-0000-0000-0000-000000000000",
        tests: ["Test X", "Test Y", "Test Z","Test W"],
      },
  ];

  return (
    <Sider
      className="right-sidebar"
      theme="light"
      width={350}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      trigger={
        collapsed ? (
          <LeftOutlined className="trigger" />
        ) : (
          <RightOutlined className="trigger" />
        )
      }
      style={{ position: "fixed", right: 0, zIndex: 1, height: "100%" }}
    >
      {!collapsed && (
        <div className="right-side-bar">
          <div className="jobs-header">
            <h2 style={{ float: "left", margin: "0", marginLeft: "8px", marginTop: "10px" }}>Jobs</h2>
            <div style={{ float: "left", marginLeft: "16px" }}>
              <Space size="middle" align="center">
                <span>All</span>
                <AndroidOutlined />
                <AppleOutlined />
                <WindowsOutlined />
              </Space>
            </div>
            <div style={{ float: "right" }}>
              <Space size="middle" align="center">
                <SearchOutlined />
                <button className="new-job-button" style={{ marginRight: "8px" }}>+ New Job</button>
              </Space>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
          <JobCard jobs={jobs} />
        </div>
      )}
    </Sider>
  );
  
};

export default RightSideBar;