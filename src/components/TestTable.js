import React, { useEffect } from "react";
import { Divider, Radio, Table } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listTest } from "../redux/actions/testActions";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

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
