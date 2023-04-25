// src/components/LeftSideBar.js
import React from "react";
import { Layout, Menu, Input } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined, SearchOutlined } from "@ant-design/icons";
import { MenuProps } from "antd/es/menu";

const { Sider } = Layout;

function getItem(
label,
key,
icon,
children,
type
) {
return {
key,
icon,
children,
label,
type,
};
}

const items = [
getItem("Navigation One", "sub1", <MailOutlined />, [
getItem("Item 1", "g1", null, [getItem("Option 1", "1"), getItem("Option 2", "2")], "group"),
getItem("Item 2", "g2", null, [getItem("Option 3", "3"), getItem("Option 4", "4")], "group"),
]),

getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
getItem("Option 5", "5"),
getItem("Option 6", "6"),
getItem("Submenu", "sub3", null, [getItem("Option 7", "7"), getItem("Option 8", "8")]),
]),

{ type: "divider" },

getItem("Navigation Three", "sub4", <SettingOutlined />, [
getItem("Option 9", "9"),
getItem("Option 10", "10"),
getItem("Option 11", "11"),
getItem("Option 12", "12"),
]),

getItem("Group", "grp", null, [getItem("Option 13", "13"), getItem("Option 14", "14")], "group"),
];

const LeftSideBar = () => {
const onClick = (e) => {
console.log("click ", e);
};

const onSearch = (value) => {
console.log("Search value: ", value);
};

return (
<Sider
style={{
height: "100vh",
position: "fixed",
left: 0,
backgroundColor: "#fff",
}}
width={256}
>
<Input
placeholder="Search"
prefix={<SearchOutlined />}
allowClear
onPressEnter={(e) => onSearch(e.currentTarget.value)}
/>
<Menu
onClick={onClick}
style={{ width: 256, height: "100%" }}
defaultSelectedKeys={["1"]}
defaultOpenKeys={["sub1"]}
mode="inline"
theme="light"
items={items}
/>
</Sider>
);
};

export default LeftSideBar;