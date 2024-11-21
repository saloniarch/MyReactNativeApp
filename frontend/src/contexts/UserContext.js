import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('profileData');
        if (storedProfile) {
          setProfileData(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error('Failed to load profile data:', error);
      }
    };

    loadProfileData();
  }, []);

  const saveProfileData = async (newProfileData) => {
    try {
      setProfileData(newProfileData);
      await AsyncStorage.setItem('profileData', JSON.stringify(newProfileData));
    } catch (error) {
      console.error('Failed to save profile data:', error);
    }
  };

  return (
    <UserContext.Provider value={{ profileData, setProfileData: saveProfileData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
