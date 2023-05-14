import React, { useEffect } from 'react';
import { Layout, Menu, Row } from 'antd';
import HeaderComponent from '../../components/HeaderComponent';
import { CgProfile } from 'react-icons/cg';
import { MdManageAccounts } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { getUserRequest } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Content } from 'antd/es/layout/layout';
const { Sider } = Layout;

const App = () => {
    const dispatchEvent = useDispatch();
    const user = useSelector((state) => state.user.user);
    

    const handleGetUser = () => {
        dispatchEvent(getUserRequest());
    };

    return (
        <>
            <Layout>
                <Layout>
                    <Sider
                        style={{
                            height: "calc(100vh - 50px)",
                            position: "fixed",
                            left: 0,
                            backgroundColor: "#fff",
                        }}
                        width={350}
                    >
                    </Sider>
                    <Menu
                        style={{ width: 350, height: "calc(100vh - 50px)" }}
                        defaultSelectedKeys={["1"]}
                    >
                        <Menu.Item
                            key="elements"
                            icon={<CgProfile />}
                            onClick={handleGetUser}
                        >
                            My Profile
                        </Menu.Item>
                        <Menu.Item
                            key="applications"
                            icon={<MdManageAccounts />}
                            onClick={() => console.log("Applications clicked")}
                        >
                            Accounts
                        </Menu.Item>
                        <Menu.Item
                            key="data_sources"
                            icon={<FaUsers />}
                            onClick={() => console.log("Data Sources clicked")}
                        >
                            Users
                        </Menu.Item>
                    </Menu>
                    <Content>
                        sdff
                    </Content>
                </Layout>
            </Layout>
        </>

    );
};

export default App;
