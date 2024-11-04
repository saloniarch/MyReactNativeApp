import React, { createContext, useContext, useState } from 'react';
import { loginUser } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password); // Call your login function
      setIsAuthenticated(true); // Update authentication state
      return response; // Return the response if needed
    } catch (error) {
      console.error("Login error: ", error); // Log the error for debugging
      throw new Error(error.message || 'Login failed'); // Handle errors
    }
  };

  const logout = () => {
    setIsAuthenticated(false); // Reset the authentication state
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
