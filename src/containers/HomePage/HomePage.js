// src/containers/HomePage/HomePage.js

import React from "react";
import { Layout } from "antd";
import LeftSideBar from "../../components/LeftSideBar";
import Sider from "antd/es/layout/Sider";
import HeaderComponent from "../../components/HeaderComponent";

const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout>
      <HeaderComponent /> 
      <Layout>
        <Sider>
          <LeftSideBar />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default HomePage;
