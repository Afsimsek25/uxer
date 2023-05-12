import React, { useEffect } from "react";
import { Layout, Breadcrumb, Table, Input, Button } from "antd";
import HeaderComponent from "../../components/HeaderComponent";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { agentRequest } from '../../redux/actions/agentActions';

const { Content } = Layout;
const { Search } = Input;

const AgentsPage = () => {
  const dispatch = useDispatch();
  const agents = useSelector(state => state.agent.agents);


  useEffect(() => {
    dispatch(agentRequest({ searchText: "" }));
  }, [dispatch]);

  const handleSearch = (value) => {
    dispatch(agentRequest({ searchText: value }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Agent Version",
      dataIndex: "agentVersion",
      key: "agentVersion",
    },
    {
      title: "Max Workers",
      dataIndex: "maxWorkers",
      key: "maxWorkers",
    },
  ];

  const expandedRowRender = (record) => {
    return (
      <div>
        <p>ID: {record.id}</p>
        <p>Description: {record.description}</p>
        <p>Active: {record.isActive ? "Yes" : "No"}</p>
        <p>Public: {record.isPublic ? "Yes" : "No"}</p>
        <p>RAM Amount: {record.ramAmount}</p>
        <p>CPU Cores: {record.cpuCores}</p>
        <p>Device Name: {record.deviceName}</p>
        <p>Resolution: {record.resolution}</p>
      </div>
    );
  };

  return (
    <Layout>
      <HeaderComponent />
      <div style={{ height: "32px" }}></div>
      <Layout>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h2>Manage Agents</h2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  type="link"
                  icon={<DownloadOutlined />}
                  style={{ marginRight: "16px" }}
                >
                  Download Agent
                </Button>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  style={{ marginRight: "16px" }}
                >
                  Register Agent
                </Button>
                <Input.Search
                  placeholder="Search Agents"
                  onSearch={handleSearch}
                  enterButton
                />
              </div>
            </div>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Table
                dataSource={agents}
                columns={columns}
                rowKey="id"
                expandable={{ expandedRowRender }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AgentsPage;
