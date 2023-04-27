// src/components/HeaderComponent.tsx

import React from "react";
import { Layout, Row, Col, Button, Space, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  DownOutlined,
  CaretDownOutlined,
  ImportOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const { Header } = Layout;

const HeaderComponent = () => {
  const { logout } = useAuth();
  const logoutHandler = () => {
    logout();
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logoutHandler}>
        Logout
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  );
  const fileMenu = (
    <Menu>
      <Menu.Item key="import" icon={<ImportOutlined />}>
        Import Test
      </Menu.Item>
    </Menu>
  );

  return (
    <Header>
      <Row align="middle" justify="space-between">
        <Col>
        <Link to="/homepage"> 
          <img src={logo} alt="u-xer" style={{ height: "40px", marginRight: "16px" }} />
        </Link>
          <Space>
          <Button type="text" style={{ color: "white" }}>
              <Link to="/homepage" style={{ color: "inherit" }}>
                Projects
              </Link>
            </Button>
            <Button type="text" style={{ color: "white" }}>
              Monitor
            </Button>
            <Button type="text" style={{ color: "white" }}>
              Addons
            </Button>
            <Button type="text" style={{ color: "white" }}>
              Reports
            </Button>
            <Button type="text" style={{ color: "white" }}>
              <Link to="/agents" style={{ color: "inherit" }}>
                Agents
              </Link>
            </Button>
            <Button type="text" style={{ color: "white" }}>
              Integrations
            </Button>
          </Space>
          <Space>
            <Button type="primary">New Test</Button>
            <Dropdown overlay={fileMenu} trigger={["click"]}>
              <Button type="primary" onClick={(e) => e.preventDefault()}>
                Open File <CaretDownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </Col>
        <Col>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button
              type="link"
              icon={<UserOutlined />}
              onClick={(e) => e.preventDefault()}
            >
              User <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;