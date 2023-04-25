import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../containers/LoginPage/LoginPage";
import HomePage from "../containers/HomePage/HomePage";
import Authentication from "./Authentication";

const RoutePath = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/homepage"
        element={
          <Authentication>
            <HomePage />
          </Authentication>
        }
      />
    </Routes>
  );
};
export default RoutePath;
