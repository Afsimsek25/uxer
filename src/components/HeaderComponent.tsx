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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { clearLoginData } from "../redux/actions/loginActions";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const logout = () => {
    dispatch(clearLoginData());
    localStorage.removeItem("data");
    sessionStorage.removeItem("data");
    loginState.data = null;
    navigate("/login");
  };

  if (!loginState.data) {
    return null;
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
      <Menu.Item key="logout" icon={<SettingOutlined />} >
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
          <Space>
            <Button type="text" style={{ color: "white" }}>
              Project
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
              Agents
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
