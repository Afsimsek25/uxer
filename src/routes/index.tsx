// src/Routes.tsx

import { BrowserRouter, Route, Routes as RouterSwitch } from 'react-router-dom';

import LoginPage from '../containers/LoginPage/LoginPage';
import Register from '../containers/Register/Register';
import ForgotPassword from '../containers/ForgotPassword/ForgotPassword';
import HeaderComponent from '../components/HeaderComponent'
import React, { useState, useEffect } from 'react';
import HomePage from '../containers/HomePage/HomePage';

const Routes: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem('data') || sessionStorage.getItem('data');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <HeaderComponent />
      <RouterSwitch>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
        
        {/* Diğer rotaları buraya ekleyebilirsiniz. */}
      </RouterSwitch>
    </BrowserRouter>
  );
};

export default Routes;
