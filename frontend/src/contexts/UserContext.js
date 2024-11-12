import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize with empty values or placeholder data
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    profileImage: null, // You can set this to a placeholder URL if you prefer
  });

  const updateUser = (updatedUser) => {
    setUser((prevState) => ({ ...prevState, ...updatedUser }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
