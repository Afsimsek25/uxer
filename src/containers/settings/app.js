import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';
import { useState } from 'react';
import Settings from './Settings';
import HomePage from '../HomePage/HomePage';
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
//const items = [
 // getItem('Navigation One', '1', < />),
  
//];
const App = () => {
  
  return (
    <>
      <h1>Settings</h1>
    </>
  );
};
export default App;