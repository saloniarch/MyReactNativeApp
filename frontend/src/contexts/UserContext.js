import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/authApi';
import { getToken } from '../utils/tokenUtils';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data from the backend on app load
  const fetchProfileData = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error('No token found');

      console.log('Fetching profile data with token:', token);

      const response = await api.get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Profile data:', response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
    }
  };

  useEffect(() => {
    fetchProfileData();  // Call fetchProfileData on component mount
  }, []);  // Empty dependency array ensures it runs only once

  // Update profile data in both state and backend
  const updateProfileData = async (newData) => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await api.put('/user/profile', newData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Profile data updated:', response.data);
      setProfileData(response.data); // Update state with new profile data
    } catch (error) {
      console.error('Failed to update profile data:', error.message);
    }
  };

  return (
    <UserContext.Provider value={{ profileData, setProfileData: updateProfileData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
