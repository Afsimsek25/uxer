// src/components/HeaderComponent.tsx

import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { clearLoginData } from '../redux/actions/loginActions';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearLoginData());
    localStorage.removeItem('data');
    sessionStorage.removeItem('data');
    navigate('/login');
  };

  if (!loginState.data) {
    return null;
  }

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" selectable={false}>
        {/* Menü öğeleri buraya eklenebilir */}
        <Menu.Item key="logout">
          <Button type="link" onClick={logout}>
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
