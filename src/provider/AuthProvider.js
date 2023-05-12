import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { routes } from "../routesPath";


const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || {routes:routes.profile.path};
  const loginState = useSelector((state) => state.login);
  let [user, setUser] = useState({ token: null, permissions: [] });
  const usr = JSON.parse(localStorage.getItem('token'));

  if (usr) {
      user = usr;
  }

  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem('token'));
    if (usr) {
        setUser(usr);
        console.log(usr)
    }
  }, []);

  function login(token) {
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
    localStorage.removeItem("data");
    sessionStorage.removeItem("data");
    loginState.data = null;
    navigate(routes.login.path,);
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
