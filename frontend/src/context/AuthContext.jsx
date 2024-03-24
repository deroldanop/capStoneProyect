import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    updateUserData();
  }, []);

  const updateUserData = () => {
    // get username from localstorage
    const username = localStorage.getItem("username");
    setCurrentUser(username ? { username } : null);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    updateUserData();
  };

  const isAuthorized = currentUser !== null;

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthorized, updateUserData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
