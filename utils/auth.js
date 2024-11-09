import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const API_URL = "http://10.0.0.13:5000/api/auth";

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Register function for new users
export const register = async ({ name, surname, email, password }) => {
  if (!name || !surname) {
    throw new Error("Name and surname are required.");
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format.");
  }
  if (!isValidPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
    );
  }

  // API call for registration
  try {
    const response = await axios.post(`${API_URL}/register`, { name, surname, email, password });
    return response.data; // Return response from the backend (for ex. success message)
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login function for users
export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { token, user } = response.data;

    // Decode the token to check its expiry time
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      throw new Error("Token has expired");
    }

    // Store the token in AsyncStorage
    await AsyncStorage.setItem('token', token);

    // store the user data as well
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return { token, user }; // Return the token and user info
  } catch (error) {
    console.error("Login error: ", error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Check if token is valid
export const isTokenValid = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) return false; // No token, not authenticated

    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime; // Check if the token has expired
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};

// Logout function
export const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
};
