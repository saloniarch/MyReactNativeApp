import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../utils/auth';
import * as Keychain from 'react-native-keychain';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if the user is authenticated on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = await Keychain.getGenericPassword(); // Fetch token from secure storage
      if (token && token.password) {
        const decodedToken = jwt_decode(token.password); // Decode the token to get its expiry time

        // Check if the token is expired
        const isExpired = decodedToken.exp < Date.now() / 1000;
        if (isExpired) {
          await logout(); // Log the user out if the token is expired
        } else {
          // Token is valid, set the user data
          const userData = await fetchUserFromToken(token.password); // Optionally fetch user data with token
          setIsAuthenticated(true);
          setUser(userData);
        }
      }
    };

    checkAuth(); // Call this on app load
  }, []);

  const login = async (username, password) => {
    try {
      const { token, user } = await loginUser(username, password); // Call your login API function

      // Store the token securely
      await Keychain.setGenericPassword('auth_token', token); // Store the JWT token securely

      setIsAuthenticated(true);
      setUser(user);

      return { token, user }; // Return token and user
    } catch (error) {
      console.error("Login error: ", error);
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    await Keychain.resetGenericPassword(); // Clear the token from secure storage
  };

  // Fetch user data from token (optional)
  const fetchUserFromToken = async (token) => {
    try {
      // You can use the token to make an API call to fetch user info if needed
      // Example:
      const response = await fetch('http://localhost:5000/api/auth/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      return userData; // Return user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Unable to fetch user data');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
