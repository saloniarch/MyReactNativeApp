import React, { createContext, useContext, useState, useEffect } from 'react';
import {getProtectedData, loginUser, logoutUser } from '../api/authApi';
import { getToken, saveToken, clearToken } from '../utils/tokenUtils'; // Assuming you have token management functions
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken(); 
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const isExpired = decodedToken.exp < Date.now() / 1000;

          if (isExpired) {
            await logout(); 
          } else {
            setIsAuthenticated(true); // User is authenticated
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { token, user } = await loginUser(username, password);
      await saveToken(token);  // Save token
      setIsAuthenticated(true); // Set authentication status
      return { token, user };
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearToken();  // Clear token and logout logic
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getProtectedData, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
