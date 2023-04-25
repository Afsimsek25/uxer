// src/components/RightSidebar.tsx

import React from 'react';
import { Layout, Menu } from 'antd';
import { FolderOpenOutlined, PlusCircleOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const RightSidebar = () => {
  return (
    <Sider width={80} theme="dark">
      <Menu mode="vertical" theme="dark" selectable={false}>
        <Menu.Item key="folders" icon={<FolderOpenOutlined />} />
        <Menu.Item key="add" icon={<PlusCircleOutlined />} />
      </Menu>
    </Sider>
  );
};

export default RightSidebar;
