import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Call fetchUserFromToken when the app is initialized
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          // Fetch user data based on the token
          const userData = await fetchUserFromToken();
          setUser(userData);
        } else {
          setError('No token found');
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []); // Empty dependency array to run only once on mount

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      <Text>Welcome, {user?.username}</Text>
    </View>
  );
};

export default App;
