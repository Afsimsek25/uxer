import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import LeftSideBar from "../../components/LeftSideBar";
import Sider from "antd/es/layout/Sider";
import HeaderComponent from "../../components/HeaderComponent";

const { Content } = Layout;

const HomePage = () => {

  return (
  <Layout>
    <HeaderComponent />
    <div style={{ height: "32px" }}></div>
    <Layout>
      <Sider>
        <LeftSideBar />
      </Sider>
      <Layout>
        <Content>Content</Content>
      </Layout>
    </Layout>
  </Layout>
);

  
  
};

export default HomePage;