import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../routesPath";
const Authentication = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    if (!user.token || !user.token.accessToken) {
        return <Navigate to={routes.login.path} state={{ path: location.pathname }} />;
    }
    return children;
};export default Authentication;