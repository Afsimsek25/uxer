import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb, Table, Input, Button } from "antd"; // Button ve Input burada import edildi
import HeaderComponent from "../../components/HeaderComponent";
import axios from "axios";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Search } = Input;

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async (search = "") => {
    const result = await axios.post(
      "https://gateway-test.u-xer.com/api/Agent/search",
      {
        searchText: search,
        name: "",
        description: "",
      },
      {
        headers: {
          accept: "*/*",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiYWZzaW1zZWsiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZnNpbXNlazI1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlNhIiwiVXhlclRva2VuVHlwZSI6IlVzZXIiLCJVeGVyQWNjb3VudElkIjoiIiwiVXhlclVzZXJJZCI6IjQxMjAyY2VmLTVkZmMtNDQ2NC05ZWQwLTFlZWUzODMyMmUwYyIsIm5iZiI6MTY4MjUxOTU0OCwiZXhwIjoxNjg4NTE5NDg4LCJpc3MiOiJ1LXhlci5jb20iLCJhdWQiOiJ1LXhlci5jb20ifQ.uGqNkyHy6SrIQgjSlkpUVB7SlF-y-RwMB4kUgPEeVpH7sHDyeM8wSSU27l7PLO0Fu6o5UXcHy0MS_9IKdGBpWA",
          "Content-Type": "application/json",
        },
      }
    );

    setAgents(result.data);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    fetchAgents(value);
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
