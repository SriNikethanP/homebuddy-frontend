import axios from 'axios';
import config from './config';

// Set the base URL for all axios requests
axios.defaults.baseURL = config.apiUrl;

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Add request interceptor to handle CORS preflight
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Log the configuration
console.log('Axios configured with base URL:', config.apiUrl);

export default axios; 