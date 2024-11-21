import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const API_URL = __DEV__ ? "http://10.0.0.13:5000/api/auth" : "https://yourapi.com/api/auth";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const getProtectedData = async () => {
  const token = await AsyncStorage.getItem('auth_token'); // Retrieve token
  if (!token) throw new Error("No token found");

  console.log("Sending token:", token); // Log token before sending

  const response = await api.get('/protected', { 
    headers: {
      Authorization: `Bearer ${token}`,  // Attach token to Authorization header
    },
  });

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await api.post('/login', { username, password });
  console.log(username, password);
  const { token, user } = response.data;

  console.log("Received Token:", token); // Log received token from API

  try {
    const decodedToken = jwt_decode(token);
    console.log("Decoded Token:", decodedToken); // Log decoded payload to ensure validity

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) throw new Error("Token has expired");

    await AsyncStorage.setItem('auth_token', token);
    await AsyncStorage.setItem('user_data', JSON.stringify(user));

    return { token, user };
  } catch (error) {
    console.error("Error during JWT decoding:", error.message);
    throw new Error("Token decoding failed or is expired.");
  }
};

export const fetchUserFromToken = async () => {
  const token = await AsyncStorage.getItem('auth_token');
  if (!token) throw new Error('No auth token found');

  const decodedToken = jwtDecode(token);
  if (decodedToken.exp < Date.now() / 1000) throw new Error('Token expired');

  const response = await api.get('/user', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('auth_token');
  await AsyncStorage.removeItem('user_data');
};

export const refreshToken = async () => {
  const token = await AsyncStorage.getItem('auth_token');
  const response = await api.post('/refresh-token', { token });

  const { newToken } = response.data;
  await AsyncStorage.setItem('auth_token', newToken);
  return newToken;
};
