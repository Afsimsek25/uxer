import React, { useEffect } from "react";
import { Divider, Radio, Table,Menu,Popover, Modal, Form, Input } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listTest,deleteTest, duplicateTest,editTest } from "../redux/actions/testActions";
import { MoreOutlined,PlayCircleOutlined,EditOutlined,DeleteOutlined } from "@ant-design/icons";


const App = () => {
  const selectedFolderId = useSelector(
    (state) => state.folder.selectedFolderId
  );
  const stateTestData = useSelector((state) => state.test.tests);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      dispatch(editTest({id:editingTest,...values}));
      console.log('Success:', stateTestData);
      setIsModalVisible(false);
      form.resetFields();
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const handleTestDelete = (testId) => {
    dispatch(deleteTest(testId));
  };
  const handleTestEdit = (testData) => {
    setEditingTest(testData.id);
    form.setFieldsValue({
      name: testData.name,
      description: testData.description,
    });
    setIsModalVisible(true);
  };

  const handleMenuOptionClick = (option, record) => {
    if (option === 'Duplicate') {
      dispatch(duplicateTest(record.id));
      console.log('Duplicate clicked for record:', record);
    }
    // Diğer opsiyonlar için de benzer işlemler yapılabilir.
  };

  const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Application/File Name",
    dataIndex: "application_file_name",
  },
  {
    title: "Modified",
    dataIndex: "modified",
  },
  {
    title: '',
    key: 'more',
    render: (text, record) => {
      const content = (
        <Menu>
          {testMoreOptions.map((option, index) => (
            <Menu.Item 
              key={index} 
              onClick={() => handleMenuOptionClick(option, record)}
            >
              {option}
            </Menu.Item>
          ))}
        </Menu>
      );
  
      return (
        <div>
          <PlayCircleOutlined style={{ marginRight: 8 }} />
          <EditOutlined style={{ marginRight: 8 }} onClick={() => handleTestEdit(record)} />
          <DeleteOutlined style={{ marginRight: 8 }} onClick={() => handleTestDelete(record.id)} />
          <Popover content={content} trigger="click">
            <MoreOutlined />
          </Popover>
        </div>
      );
    },
  },
  
];
const testMoreOptions = [
  "Copy to project",
  "Move to Folder",
  "Share Test",
  "Get Direct Link",
  "Change Input Parameter",
  "Duplicate",
  "Copy ID",
  "Save as File",
  "CSV Parameters Template",
  "Generate Code",
  "Manuel Test",
  "Test Document",
  "Show History",
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {},
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};
  useEffect(() => {
    if (selectedFolderId){
      const reqDetails = {
      includeFolder: true,
      includeJobs: true,
      includeExecutions: true,
      folderId: selectedFolderId,
    };
    dispatch(listTest(reqDetails));
    }
    
  }, [selectedFolderId]);
  useEffect(() => {
    if (stateTestData){
      setData(stateTestData);
    }
  }, [stateTestData]);

  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="Edit Test"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name of the test!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default App;
