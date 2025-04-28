import axios from 'axios';
import { API_BASE_URL } from '../api/apiConfig';

// Ceate apiClient
const apiClient = axios.create({
  baseURL: API_BASE_URL, 
});

// Request Interceptor - Automatically attach x-auth-token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
