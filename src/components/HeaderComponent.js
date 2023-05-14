// src/components/HeaderComponent.tsx

import {
  Layout,
  Row,
  Col,
  Button,
  Space,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  message,
} from "antd";
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
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../routesPath";
import { useSelector,useDispatch } from "react-redux";

const { Header } = Layout;

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const selectedFolderId = useSelector((state) => state.folder.selectedFolderId);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { logout } = useAuth();
  const logoutHandler = () => {
    logout();
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <NavLink to={routes.settings.path}>{routes.settings.title}</NavLink>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logoutHandler}>
        Logout
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

  const handleNewTest = () => {
    if (selectedFolderId) {
      console.log(selectedFolderId);
      setIsModalVisible(true);
    }else{
      message.error("Please select a folder");
    }
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch({type:"ADD_TEST",payload:{...values,script:"",folderId:selectedFolderId}});
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // navbarda username göstermek için
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setFirstName(token.token.username);
    } else {
      setFirstName("User");
    }
  }, []);

  return (
    <Header>
      <Row align="middle" justify="space-between">
        <Col>
          <Link to={routes.homepage.path}>
            <img
              src={logo}
              alt="u-xer"
              style={{ height: "40px", marginRight: "16px" }}
            />
          </Link>
          <Space>
            <Button type="text" style={{ color: "white" }}>
              <Link to={routes.homepage.path} style={{ color: "inherit" }}>
                {routes.homepage.titleTwo}
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
              <Link to={routes.agents.path} style={{ color: "inherit" }}>
                {routes.agents.title}
              </Link>
            </Button>
            <Button type="text" style={{ color: "white" }}>
              Integrations
            </Button>
          </Space>
          <Space>
            <div>
              <Button type="primary" onClick={handleNewTest}>
                New Test
              </Button>
              <Modal
                title="New Test"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form form={form} layout="vertical" name="form_in_modal">
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the name of the test!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
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
              {firstName} <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
