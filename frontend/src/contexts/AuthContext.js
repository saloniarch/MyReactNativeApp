import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser } from '../api/authApi';
import * as Keychain from 'react-native-keychain';
import jwt_decode from 'jwt-decode'; 
import { useUser } from './UserContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserData } = useUser(); // Access the setUser function from UserContext

  useEffect(() => {
    const checkAuth = async () => {
      const token = await Keychain.getGenericPassword(); // Fetch stored token securely
      if (token && token.password) {
        try {
          const decodedToken = jwt_decode(token.password); // Decode token
          const isExpired = decodedToken.exp < Date.now() / 1000;

          if (isExpired) {
            await logout(); // Logout if the token is expired
          } else {
            setIsAuthenticated(true);
            // Fetch user data using the token if necessary
            setUserData(decodedToken.user); // Save user info into UserContext
          }
        } catch (error) {
          console.error("Token decode error:", error);
        }
      }
    };
    
    checkAuth(); // Check authentication status on app load
  }, [setUserData]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { token, user } = await loginUser(username, password); // Call your login API
      await Keychain.setGenericPassword('auth_token', token); // Store token securely
      setIsAuthenticated(true);
      setUserData(user); // Update user data in UserContext
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUserData(null); // Clear user data in UserContext
    await Keychain.resetGenericPassword(); // Clear token from secure storage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
