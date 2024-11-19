import axios from 'axios';

const API = axios.create({
    baseURL: 'http://10.0.0.13:5000', 
});

// JWT token to headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
