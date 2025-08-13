import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (formData) => {
    setIsLoading(true);
    const response = await axios.post(
      "http://localhost:5000/api/auth/signup",
      formData
    );
    setUser(response.data.user);
    setIsLoading(false);
  };

  const login = async (email, password) => {
    setIsLoading(true);
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    setUser(response.data.user);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
