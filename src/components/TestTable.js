import React, { useEffect } from "react";
import { Divider, Radio, Table,Menu,Popover } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listTest } from "../redux/actions/testActions";
import { MoreOutlined,PlayCircleOutlined,EditOutlined,DeleteOutlined } from "@ant-design/icons";

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
            <Menu.Item key={index}>{option}</Menu.Item>
          ))}
        </Menu>
      );

      return (
        <div>
          <PlayCircleOutlined style={{ marginRight: 8 }} />
          <EditOutlined style={{ marginRight: 8 }} />
          <DeleteOutlined style={{ marginRight: 8 }} />
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

const handleTestMoreOptions = (record) => {
  console.log('hi');
};
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {},
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};
const App = () => {
  const selectedFolderId = useSelector(
    (state) => state.folder.selectedFolderId
  );
  const state = useSelector((state) => state);
  const stateTestData = useSelector((state) => state.test.tests);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();


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
    </div>
  );
};
export default App;
