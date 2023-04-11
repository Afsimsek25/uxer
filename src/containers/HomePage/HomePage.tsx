import React from "react";
import { Layout, Breadcrumb } from "antd";

const { Content } = Layout;

const HomePage = () => {
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
