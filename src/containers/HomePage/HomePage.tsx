import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const HomePage = () => {
  const loginState = useSelector((state: RootState) => state.login);
  console.log('aaaaa',loginState.data)
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!loginState.data) {
      navigate("/login");
    }
  }, [loginState, navigate]);


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <h1>Welcome to the Home Page!</h1>
          <p>
            This is a sample Home Page built using Ant Design's Layout
            component.
          </p>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
