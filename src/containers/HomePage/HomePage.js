// src/containers/HomePage/HomePage.js

import React from "react";
import { Layout } from "antd";
import LeftSideBar from "../../components/LeftSideBar";
import Sider from "antd/es/layout/Sider";
import HeaderComponent from "../../components/HeaderComponent";
import RightSidebar from "../../components/RightSideBar"

const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout>
      <HeaderComponent /> 
      <Layout>
        <Sider>
          <LeftSideBar />
        </Sider>
        <Content>
          {/* İçerik alanı */}
        </Content>
        <Sider>
          <RightSidebar />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default HomePage;
