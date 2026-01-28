import axios from 'axios';

// In production on Vercel, API is on same domain. In dev, use localhost:4000
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:4000');

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
