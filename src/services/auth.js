import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add request interceptor to handle CORS preflight
api.interceptors.request.use(
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

const authService = {
    login: async (credentials) => {
        try {
            console.log('Sending login request with credentials:', { username: credentials.username, password: '***' });
            const response = await api.post('/login', credentials);
            console.log('Login response received:', { status: response.status, data: { ...response.data, token: '***' } });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('role', response.data.role);
                return response.data;
            } else {
                throw new Error('No token received in response');
            }
        } catch (error) {
            console.error('Login error:', error);
            
            if (error.response) {
                // Server responded with an error
                const status = error.response.status;
                const message = error.response.data || 'Login failed';
                
                console.error(`Server error (${status}):`, message);
                
                if (status === 401) {
                    throw new Error('Invalid username or password');
                } else if (status === 403) {
                    throw new Error('Your account is not active. Please contact the administrator.');
                } else if (status === 400) {
                    throw new Error(message || 'Invalid request. Please check your input.');
                } else {
                    throw new Error(message || 'Login failed');
                }
            } else if (error.request) {
                // No response received
                console.error('No response received from server');
                throw new Error('Unable to connect to the server. Please check your internet connection.');
            } else {
                // Request setup error
                console.error('Request setup error:', error.message);
                throw new Error('Error setting up the request: ' + error.message);
            }
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
    },

    getCurrentUser: () => {
        return localStorage.getItem('token') !== null;
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    getRole: () => {
        return localStorage.getItem('role');
    },

    isSuperAdmin: () => {
        return localStorage.getItem('role') === 'SUPER_ADMIN';
    },

    updatePassword: async (adminId, newPassword) => {
        try {
            const response = await api.post(`/auth/update-password/${adminId}`, { newPassword });
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data);
            }
            throw new Error('Failed to update password');
        }
    }
};

export { authService }; 