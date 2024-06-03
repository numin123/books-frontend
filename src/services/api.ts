import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust this URL based on your Rails API base URL
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    // Add token to request headers if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
