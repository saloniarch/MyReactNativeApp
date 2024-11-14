import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode'; 

const API_URL = __DEV__ ? "http://10.0.0.13:5000/api/auth" : "https://yourapi.com/api/auth"; // Dynamic API URL

// Axios instance with timeout and baseURL
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default api;

// Email Validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password Validation
export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Register Function
export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post('/register', { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);

    if (error.response) {
      const errorMessage = error.response.data?.message || 'Registration failed';
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("No response received from the server. Please check your network connection.");
    } else {
      throw new Error("An unexpected error occurred: " + error.message);
    }
  }
};

// Login Function
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    const { token, user } = response.data;

    // Decode token to check expiration
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; 
      if (decodedToken.exp < currentTime) throw new Error("Token has expired");
    } catch (decodeError) {
      console.error("Token decoding error:", decodeError);
      throw new Error("Failed to decode token.");
    }

    // Store token and user data
    await AsyncStorage.setItem('auth_token', token);
    await AsyncStorage.setItem('user_data', JSON.stringify(user));

    return { token, user };
  } catch (error) {
    console.error("Login error: ", error);
    if (error.response) {
      throw new Error(error.response.data?.message || 'Login failed');
    } else if (error.request) {
      throw new Error("No response received from the server. Please check your network connection.");
    } else {
      throw new Error("An unexpected error occurred: " + error.message);
    }
  }
};


// Token Validation Function
export const isTokenValid = async () => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    if (!token) return false;

    const decodedToken = jwt_decode(token);
    return decodedToken.exp > Date.now() / 1000;
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};

// Fetch User Data
export const fetchUserFromToken = async () => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    if (!token) throw new Error('No auth token found');

    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Unable to fetch user data');
  }
};

// Logout Function
export const logout = async () => {
  await AsyncStorage.removeItem('auth_token');
  await AsyncStorage.removeItem('user_data');
};

// Axios Interceptor for Requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Interceptor for Responses (Handle 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  }
);
