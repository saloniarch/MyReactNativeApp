import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode'; // For decoding JWT to check expiry

const API_URL = __DEV__ ? "http://10.0.0.13:5000/api/auth" : "https://yourapi.com/api/auth"; // Dynamic API URL for dev and prod environments

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
    return response.data; // Return response from the backend (e.g., success message)
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
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      throw new Error("Token has expired");
    }

    // Store the token securely using Keychain
    await Keychain.setGenericPassword('auth_token', token);
    await Keychain.setGenericPassword('user_data', JSON.stringify(user));

    return { token, user }; // Return the token and user info
  } catch (error) {
    console.error("Login error: ", error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Check if token is valid (to be used on app load or before requests)
export const isTokenValid = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) return false; // No token, not authenticated

    const token = credentials.password;
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp > currentTime; // Check if the token has expired
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};

// Fetch user data from token (optional)
export const fetchUserFromToken = async (token) => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Unable to fetch user data');
  }
};

// Logout function
export const logout = async () => {
  await Keychain.resetGenericPassword(); // Clear the token from secure storage
  await Keychain.resetGenericPassword(); // Clear the user data from secure storage
};

// Axios Interceptor for attaching token to all requests
axios.interceptors.request.use(
  async (config) => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.password) {
      config.headers['Authorization'] = `Bearer ${credentials.password}`; // Attach token if available
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Interceptor to handle token expiration (401 Unauthorized response)
axios.interceptors.response.use(
  (response) => response, // Proceed with the response if valid
  async (error) => {
    if (error.response.status === 401) {
      // Handle token expiration or unauthorized access here
      await Keychain.resetGenericPassword(); // Clear expired token
      // Optionally navigate to login screen or show an alert
    }
    return Promise.reject(error); // Reject the error if it is not handled
  }
);
