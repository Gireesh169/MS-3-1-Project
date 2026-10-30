import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(authService.getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    const storedToken = authService.getToken();

    if (storedToken && storedUser) {
      setUser(storedUser);
      setToken(storedToken);
    } else {
      setUser(null);
      setToken(null);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    const result = await authService.login(credentials);
    setUser({
      username: result.username,
      role: result.role,
    });
    setToken(result.token);
    return result;
  };

  const handleRegister = async (userData) => {
    return await authService.register(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    isLoggedIn: !!token && !!user,
    isAdmin: user?.role === "ADMIN" || user?.role === "ROLE_ADMIN",
    isUser: user?.role === "USER" || user?.role === "ROLE_USER",
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
