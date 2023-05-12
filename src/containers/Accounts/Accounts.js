import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import LeftSideBar from "../../components/LeftSideBar";
import Sider from "antd/es/layout/Sider";
import HeaderComponent from "../../components/HeaderComponent";
import DataTable from "../../components/table/DataTable";

const { Content } = Layout;

const HomePage = () => {

  return (
  <Layout>
    <HeaderComponent />
    <div style={{ height: "32px" }}></div>
    <Layout>
      <Layout>
       <DataTable></DataTable>
      </Layout>
    </Layout>
  </Layout>
);

  
  
};

export default HomePage;
