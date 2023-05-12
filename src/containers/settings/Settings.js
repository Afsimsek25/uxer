import React from 'react'
import { Layout } from "antd";
import LeftSideBar from "../../components/LeftSideBar";
import Sider from "antd/es/layout/Sider";
import HeaderComponent from "../../components/HeaderComponent";
import RightSidebar from "../../components/RightSideBar"
import App from './app';
function Settings() {
    return (
        <>
            <Layout>
                <HeaderComponent />
                <Layout>
                    <div test=''>
                        <App />
                    </div>
                </Layout>
            </Layout>

        </>
    )
}

export default Settings