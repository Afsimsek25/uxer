import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/profile";
  let [user, setUser] = useState({ token: null, permissions: [] });
  const usr = JSON.parse(localStorage.getItem('token'));
  if (usr) {
      user = usr;
  }

  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem('token'));
    if (usr) {
        setUser(usr);
    }
    console.log("authprovider1", usr);
  }, []);

  function login(token) {
    console.log('token:', token);
    if (token) {
      setUser({ token: token, permissions: ["view_extra"] });
      localStorage.setItem('token', JSON.stringify({ token: token, permissions: ["view_extra"] }));
    } else {
      setUser({ token: user, permissions: ["view_about"] });
      localStorage.setItem('token', JSON.stringify({ token: user, permissions: ["view_about"] }));
    }
    navigate(redirectPath, { replace: true });
  }
  const logout = () => {
    setUser({ token: "", permissions: [] });
    localStorage.setItem('token', JSON.stringify({ token: null, permissions: [] }));
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
