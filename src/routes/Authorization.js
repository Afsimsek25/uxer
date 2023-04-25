import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";
import { useAuth } from "../provider/AuthProvider";
const Authorization = ({ permissions }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (user.token && user.token.accessToken) {
    const userpermission = user.permissions;
    const isAllowed = permissions.some((allowed) =>
      userpermission.includes(allowed)
    );
    return isAllowed ? <Outlet /> : <Unauthorized />;
  }
  return <Navigate to="/login" state={{ path: location.pathname }} replace />;
};
export default Authorization;
