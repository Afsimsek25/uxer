import { Content } from 'antd/es/layout/layout';
import Paragraph from 'antd/es/typography/Paragraph';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../../routesPath';
import Typography from 'antd/es/typography/Typography';
import { getUserRequest } from '../../redux/actions/userActions';
import Avatar from './Avatar';
import SettingsLeftBar from './SettingsLeftBar';

function MyProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [name, setName] = useState(user?.name);
    const [surname, setSurname] = useState(user?.surname);

    const handleSurnameChange = (newSurname) => {
        setSurname(newSurname);
    };

    const handleNameChange = (newName) => {
        setName(newName);
    };

    useEffect(() => {
        dispatch(getUserRequest());

    }, [dispatch]);

    useEffect(() => {
        setName(user?.name);
        setSurname(user?.surname);
    }, [user]);

    return (<>
        <SettingsLeftBar />
        <Content style={{ background: "#fff", display: "flex" }}>
            <div style={{ padding: 100, minHeight: 360, width: "25%" }}>
                <label htmlFor="email">Email</label>
                <Paragraph copyable={{ text: user?.email }}>
                    {user?.email}
                </Paragraph>

                <label htmlFor="changePassword">Password</label>
                <Paragraph>
                    <NavLink to={routes.changePassword.path} target="_blank">
                        {routes.changePassword.title}
                    </NavLink>
                </Paragraph>

                <label htmlFor="name">Name</label>
                <Typography.Title
                    editable={{ onChange: handleNameChange }}
                    level={4}
                >
                    {name}
                </Typography.Title>

                <label htmlFor="lastname">Last Name</label>
                <Typography.Title
                    editable={{ onChange: handleSurnameChange }}
                    level={4}
                >
                    {surname}
                </Typography.Title>
            </div>

            <div style={{ padding: 100, minHeight: 360, width: "25%" }}>
                <Avatar />
            </div>
        </Content>
    </>
    );
}

export default MyProfile;
