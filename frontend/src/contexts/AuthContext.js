import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '../utils/tokenUtils'; 
import { saveProfileData } from '../contexts/UserContext'; // import the function to update user profile
import jwtDecode from 'jwt-decode';
import { loginUser } from '../api/authApi';

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
            setIsAuthenticated(true); 
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
      const { token } = await loginUser(username, password);
      await saveToken(token);
  
      // Fetch profile data after login
      const response = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setProfileData(response.data); // Save profile data to context
      setIsAuthenticated(true); 
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };  

  const logout = async () => {
    await clearToken();  
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
