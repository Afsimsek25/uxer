import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import LeftSideBar from "../../components/LeftSideBar";
import Sider from "antd/es/layout/Sider";
import HeaderComponent from "../../components/HeaderComponent";

const { Content } = Layout;

const HomePage = () => {

  return (
    <Layout>  
      <HeaderComponent></HeaderComponent>
      <Sider>
        <LeftSideBar></LeftSideBar>
      </Sider>
      <Content>Content</Content>
    </Layout>
  );
};

export default HomePage;
