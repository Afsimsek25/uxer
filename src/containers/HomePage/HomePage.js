// src/containers/HomePage/HomePage.js

import React from "react";
import { Layout } from "antd";
import LeftSideBar from "../../components/LeftSideBar";
import Sider from "antd/es/layout/Sider";
import HeaderComponent from "../../components/HeaderComponent";
import RightSidebar from "../../components/RightSideBar"
import TestTable from "../../components/TestTable";

const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout>
     
      <Layout>
        <Sider>
          <LeftSideBar />
        </Sider>
        <Content style={{ padding: '0 50px', margin: '24px 160px 0', overflow: 'initial', width: '0px', height: '0px' }}>
          <TestTable />
        </Content>
        <Sider>
          <RightSidebar />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default HomePage;
