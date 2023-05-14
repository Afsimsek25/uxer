import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../containers/LoginPage/LoginPage";
import HomePage from "../containers/HomePage/HomePage";
import Authentication from "./Authentication";
import ForgotPassword from "../containers/ForgotPassword/ForgotPassword";
import Accounts from "../containers/Accounts/Accounts";
import AgentsPage from "../containers/Agents/Agents";
import Register from "../containers/Register/Register";
import Settings from "../containers/settings/Settings";
import { routes } from "../routesPath";
import HeaderComponent from "../components/HeaderComponent";
import Page404 from '../components/404'

const RoutePath = () => {
  const location = useLocation();
  const hideHeader = location.pathname === routes.login.path || location.pathname === routes.forgotPassword.path || location.pathname === routes.register.path;


  return (
    <>
      {!hideHeader && <HeaderComponent />}
      <Routes>

        <Route path={routes.login.path} element={<LoginPage />} />
        <Route path={routes.forgotPassword.path} element={<ForgotPassword />} />
        <Route path={routes.register.path} element={<Register />} />
        <Route path="*" element={< Page404 />} />

        <Route path={routes.homepage.path} element={<Authentication><HomePage /></Authentication>} />
        <Route path={routes.accounts.path} element={<Authentication><Accounts /></Authentication>} />
        <Route path={routes.agents.path} element={<Authentication><AgentsPage /></Authentication>} />
        <Route path={routes.settings.path} element={<Authentication><Settings /></Authentication>} />
      </Routes>
    </>

  );
};
export default RoutePath;
