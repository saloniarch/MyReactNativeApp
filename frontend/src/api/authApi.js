import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getToken, saveToken, clearToken } from '../utils/tokenUtils';
import { API_URL } from '@env';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Safe token decoding function
const decodeToken = (token) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    // Decode the JWT token
    const decodedToken = jwtDecode(token);

    // Check if the token has an expiration date
    if (!decodedToken || !decodedToken.exp) {
      throw new Error("Invalid token format");
    }

    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error; // Re-throw to handle it in the calling function
  }
};

// Fetch protected data
export const getProtectedData = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error("No token found");

    const response = await api.get('/protected', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching protected data:", error.message);
    throw error;
  }
};

// Register a new user
export const registerUser = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

// Login user and save token
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    const { token, user } = response.data;

    const decodedToken = decodeToken(token);
    
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      throw new Error("Token has expired");
    }

    await saveToken(token); // Save token
    return { token, user }; // Return token and user data
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// Fetch user info using token
export const fetchUserFromToken = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error("No auth token found");

    const decodedToken = decodeToken(token);

    if (decodedToken.exp < Date.now() / 1000) throw new Error("Token expired");

    const response = await api.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user from token:", error.message);
    throw error;
  }
};

// Logout user and clear storage
export const logoutUser = async () => {
  await clearToken(); // Clear token securely
};

// Refresh token
export const refreshToken = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error("No token to refresh");

    const response = await api.post('/refresh-token', { token });
    const { newToken } = response.data;

    await saveToken(newToken); // Save new token securely
    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    throw error;
  }
};
