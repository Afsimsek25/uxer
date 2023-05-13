import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../containers/LoginPage/LoginPage";
import HomePage from "../containers/HomePage/HomePage";
import Authentication from "./Authentication";
import ForgotPassword from "../containers/ForgotPassword/ForgotPassword";
import Accounts from "../containers/Accounts/Accounts";
import AgentsPage from "../containers/Agents/Agents";
import Register from "../containers/Register/Register";
import Settings from "../containers/settings/Settings";
import { routes } from "../routesPath";

const RoutePath = () => {
  return (
    <Routes>
      <Route path={routes.login.path} element={<LoginPage />} />
      <Route path={routes.forgotPassword.path} element={<ForgotPassword />} />
      <Route
        path={routes.homepage.path}
        element={
          <Authentication>
            <HomePage />
          </Authentication>
        }
      />
      <Route
        path={routes.accounts.path}
        element={
          <Authentication>
            <Accounts />
          </Authentication>
        }
      />
      <Route
        path={routes.agents.path}
        element={
          <Authentication>
            <AgentsPage />
          </Authentication>
        }
      />
      <Route
        path={routes.settings.path}
        element={
          <Authentication>
            <Settings />
          </Authentication>
        }
      />
      <Route path={routes.register.path} element={<Register />} />
    </Routes>
  );
};
export default RoutePath;
