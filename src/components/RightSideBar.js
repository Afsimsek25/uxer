import React, { useState, useEffect, useRef } from "react";

import {
  Button,
  Layout,
  Menu,
  Space,
  Modal,
  Form,
  Input,
  Switch,
  InputNumber,
  Row,
  Col,
  Select,
} from "antd";
import {
  RightOutlined,
  LeftOutlined,
  AndroidOutlined,
  AppleOutlined,
  WindowsOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./RightSideBar.css";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { agentRequest } from "../redux/actions/agentActions";
import { fetchJobs, addJob } from "../redux/actions/jobActions";
const { Sider } = Layout;
const usr = JSON.parse(localStorage.getItem("token"));

const RightSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const publicProjectId = useSelector((state) => state.project.publicProjectId);
  const [newJobModalVisible, setNewJobModalVisible] = useState(false);
  const [editJobModalVisible, setEditJobModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const dispatch = useDispatch();
  const agents = useSelector((state) => state.agent.agents);
  const newJobFormRef = useRef();
  const editJobFormRef = useRef();
  const jobs = useSelector((state) => state.job.jobs);

  useEffect(() => {
    dispatch(fetchJobs(publicProjectId));
  }, [dispatch]);

  const showNewJobModal = () => {
    if (newJobFormRef.current) {
      newJobFormRef.current.resetFields();
    }
    setNewJobModalVisible(true);
  };
  const showEditJobModal = (job) => {
    if (editJobFormRef.current) {
      editJobFormRef.current.resetFields();
    }
    setEditJob(job);
    setEditJobModalVisible(true);
    // Form fields reset after setting the modal visible.
    if (editJobFormRef.current) {
      editJobFormRef.current.setFieldsValue(job);
    }
  };
  const handleNewJobModalCancel = () => {
    setNewJobModalVisible(false);
  };
  const handleEditJobModalCancel = () => {
    setSelectedJob(null);
    setEditJobModalVisible(false);
  };

  const onFinish = async (values) => {
    const projectId = publicProjectId; // Varsayalım projectId burada tanımlanmış
    dispatch(addJob({ ...values, projectId }));
    handleNewJobModalCancel();
  };
  const onEditFinish = (values) => {
    const updatedJob = {
      ...editJob,
      ...values,
      agentId: values.agent,
    };

    axios
      .put(`https://gateway-test.u-xer.com/api/Job/${editJob.id}`, updatedJob, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setEditJobModalVisible(false);
        fetchJobs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJobDeleted = () => {
    fetchJobs();
  };
  useEffect(() => {
    if (publicProjectId) {
      fetchJobs();
    }
  }, [publicProjectId]);
  useEffect(() => {
    dispatch(agentRequest(""));
  }, [dispatch]);
  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
      className="right-sidebar"
      theme="light"
      width={350}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      trigger={
        collapsed ? (
          <LeftOutlined className="trigger" />
        ) : (
          <RightOutlined className="trigger" />
        )
      }
      style={{ position: "fixed", right: 0, zIndex: 1, height: "100%" }}
    >
      {!collapsed && (
        <div className="right-side-bar">
          <div className="jobs-header">
            <h2
              style={{
                float: "left",
                margin: "0",
                marginLeft: "8px",
                marginTop: "10px",
              }}
            >
              Jobs
            </h2>
            <div style={{ float: "left", marginLeft: "16px" }}>
              <Space size="middle" align="center">
                <span>All</span>
                <AndroidOutlined />
                <AppleOutlined />
                <WindowsOutlined />
              </Space>
            </div>
            <div style={{ float: "right" }}>
              <Space size="middle" align="center">
                <SearchOutlined />
                <button
                  className="new-job-button"
                  style={{ marginRight: "8px" }}
                  onClick={showNewJobModal}
                >
                  + New Job
                </button>
              </Space>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
          <JobCard
            jobs={jobs}
            onJobDeleted={handleJobDeleted}
            onEditJob={showEditJobModal}
          />
        </div>
      )}
      <>
        <Modal
          title="New Job"
          visible={newJobModalVisible}
          onCancel={handleNewJobModalCancel}
          footer={null}
        >
          <Form ref={newJobFormRef} onFinish={onFinish} layout="vertical">
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item label="Cron" name="cron">
              <Input />
            </Form.Item>
            <Form.Item label="Agent" name="agent">
              <Select placeholder="Select an agent">
                {agents.map((agent) => (
                  <Select.Option key={agent.id} value={agent.id}>
                    {agent.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Number of Runs if Fails" name="numOfRunIfFails">
              <InputNumber min={0} max={9} style={{ width: "100%" }} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Run Parallel"
                  name="runParallel"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Is Active"
                  name="isActive"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Job
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
      <>
        <Modal
          title="Edit Job"
          visible={editJobModalVisible}
          onCancel={handleEditJobModalCancel}
          footer={null}
        >
          <Form
            ref={editJobFormRef}
            onFinish={onEditFinish}
            layout="vertical"
            initialValues={editJob}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item label="Cron" name="cron">
              <Input />
            </Form.Item>
            <Form.Item label="Agent" name="agent">
              <Select placeholder="Select an agent">
                {agents.map((agent) => (
                  <Select.Option key={agent.id} value={agent.id}>
                    {agent.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Number of Runs if Fails" name="numOfRunIfFails">
              <InputNumber min={0} max={9} style={{ width: "100%" }} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Run Parallel"
                  name="runParallel"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Is Active"
                  name="isActive"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Edit Job
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </Sider>
  );
};

export default RightSideBar;
