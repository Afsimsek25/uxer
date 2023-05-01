import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../containers/LoginPage/LoginPage";
import HomePage from "../containers/HomePage/HomePage";
import Authentication from "./Authentication";
import ForgotPassword from "../containers/ForgotPassword/ForgotPassword";
import Accounts from "../containers/Accounts/Accounts";
import AgentsPage from "../containers/Agents/Agents"
import Register from "../containers/Register/Register";

const RoutePath = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/homepage"
        element={
          <Authentication>
            <HomePage />
          </Authentication>
        }
      />
      <Route
        path="/accounts"
        element={
          <Authentication>
            <Accounts />
          </Authentication>
        }
      />
      <Route
        path="/agents"
        element={
          <Authentication>
            <AgentsPage></AgentsPage>
          </Authentication>
        }
      />

      <Route
      path="/register"
      element={
          <Register />
      }
    />
    </Routes>
  );
};
export default RoutePath;
