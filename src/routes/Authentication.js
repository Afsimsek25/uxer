import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
const Authentication = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    console.log("authen", user)
    if (!user.token || !user.token.accessToken) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }
    return children;
};export default Authentication;