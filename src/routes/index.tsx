import React from 'react';
import { BrowserRouter, Route, Routes as RouterSwitch } from 'react-router-dom';
import LoginPage from '../containers/LoginPage/LoginPage';
import Register from '../containers/Register/Register';
import ForgotPassword from '../containers/ForgotPassword/ForgotPassword';
import Homepage from '../containers/HomePage/HomePage';


const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterSwitch>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage/>} />
        {/* Diğer rotaları buraya ekleyebilirsiniz. */}
      </RouterSwitch>
    </BrowserRouter>
  );
};

export default Routes;
