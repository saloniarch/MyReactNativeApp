import axios from 'axios';
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
export const register = async ({ username, email, password }) => {
  if (!username) {
    throw new Error("Username is required.");
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
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data; // Return response from the backend (e.g., success message)
  } catch (error) {
    console.error("Registration error:", error);

    // Improved error handling: check if response and response.data exist
    if (error.response) {
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      const errorMessage = error.response.data?.message || 'Registration failed';
      throw new Error(errorMessage);
    } else if (error.request) {
      console.error("Error request:", error.request);
      throw new Error("No response received from the server. Please check your network connection.");
    } else {
      console.error("Error message:", error.message);
      throw new Error("An unexpected error occurred: " + error.message);
    }
  }
};

// Login function for users
export const loginUser = async (username, password) => {
  if (!username || !password) {
    throw new Error("Username and password are required.");
  }

  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });

    const { token, user } = response.data;

    // Decode the token to check its expiry time
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      throw new Error("Token has expired");
    }

    // Store the token securely using AsyncStorage
    await AsyncStorage.setItem('auth_token', token);
    await AsyncStorage.setItem('user_data', JSON.stringify(user));

    return { token, user }; // Return the token and user info
  } catch (error) {
    console.error("Login error: ", error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Check if token is valid (to be used on app load or before requests)
export const isTokenValid = async () => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    if (!token) return false; // No token, not authenticated

    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp > currentTime; // Check if the token has expired
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};

// Fetch user data from token (optional)
export const fetchUserFromToken = async () => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    if (!token) throw new Error('No auth token found');

    const response = await axios.get(`${API_URL}/user`, {
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
  await AsyncStorage.removeItem('auth_token'); // Clear the token from secure storage
  await AsyncStorage.removeItem('user_data'); // Clear the user data from secure storage
};

// Axios Interceptor for attaching token to all requests
axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token if available
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Interceptor to handle token expiration (401 Unauthorized response)
axios.interceptors.response.use(
  (response) => response, // Proceed with the response if valid
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or unauthorized access here
      await AsyncStorage.removeItem('auth_token'); // Clear expired token
      // Optionally navigate to login screen or show an alert
    }
    return Promise.reject(error); // Reject the error if it is not handled
  }
);
