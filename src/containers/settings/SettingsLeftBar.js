import { Layout, Menu, Row } from 'antd';
import { CgProfile } from 'react-icons/cg';
import { MdManageAccounts } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routesPath';

const { Sider } = Layout;

const SettingsLeftBar = () => {
    return (
        <>
            <Layout>
                <Layout>
                    <Row>
                        <Sider
                            style={{
                                height: "calc(100vh - 50px)",
                                position: "fixed",
                                left: 0,
                                backgroundColor: "#fff",
                                borderRight: '1px solid #ccc'
                            }}
                            width={350}
                        >
                        </Sider>
                        <Menu
                            style={{ width: 350, height: "calc(100vh - 50px)", fontSize: 20, borderRight: '1px solid #ccc' }}
                            defaultSelectedKeys={["0"]}
                        >
                            <Menu.Item
                                key="elements"
                                icon={<CgProfile style={{ fontSize: '1.2rem' }} />}
                            >
                                <NavLink to={routes.profile.path}>My Profile</NavLink>
                            </Menu.Item>
                            <Menu.Item
                                key="applications"
                                icon={<MdManageAccounts style={{ fontSize: '1.2rem' }} />}
                            >
                                <NavLink to={routes.accounts.path}>Accounts</NavLink>
                            </Menu.Item>
                            <Menu.Item
                                key="data_sources"
                                icon={<FaUsers style={{ fontSize: '1.2rem' }} />}
                            >
                                <NavLink to={routes.users.path}>Users</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Row>
                </Layout>
            </Layout>
        </>

    );
};

export default SettingsLeftBar;
