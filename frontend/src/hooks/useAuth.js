import { useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import { fetchUserFromToken } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Check for the token on initial load
    useEffect(() => {
        const checkAuthenticatedUser = async () => {
            const token = await AsyncStorage.getItem('auth_token');
            if (token) {
                try {
                    // Fetch user data based on the token
                    const userData = await fetchUserFromToken();
                    setUser(userData);
                } catch (err) {
                    console.error('Failed to fetch user data:', err);

                    // Handle the case when the token is invalid or expired
                    setError('Failed to fetch user data.');
                    await AsyncStorage.removeItem('auth_token');  // Remove the invalid token
                    setUser(null);  // Set user to null since the token is invalid
                }
            }
        };

        checkAuthenticatedUser();
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);  // Clear previous errors
        try {
          const data = await loginUser(credentials);
          AsyncStorage.setItem('auth_token', data.token);
          setUser(data.user);
        } catch (err) {
          setError(err.message || 'Login failed');
        } finally {
          setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);  // Clear previous errors
        try {
          await registerUser(userData);
        } catch (err) {
          setError(err.message || 'Registration failed');
        } finally {
          setLoading(false);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('auth_token');
        setUser(null);
    };

    return { user, login, register, logout, loading, error };
};

export default useAuth;
