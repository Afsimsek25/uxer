import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { control } from "../../utils/Util";


const { Header } = Layout;

const HeaderComponent = () => {
    const navigate = useNavigate();
    const logOuth = () => {
        sessionStorage.removeItem("data");
        localStorage.removeItem("data");
        navigate("/login");
      };


  return (
    <Header className="header">
      <div className="logo">

      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        {control() && (
          <Menu.Item key="2">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
        )}
      </Menu>
      <div className="header-right">
        {control() ? (
          <div className="user-info">
            <span className="username">{localStorage.getItem("username")}</span>
            <LogoutOutlined className="logout-icon" onClick={logOuth} />
          </div>
        ) : (
          <Link className="login-link" to="/login">
            Login
          </Link>
        )}
      </div>
    </Header>
  );
};

export default HeaderComponent;
