// API Configuration
const getApiUrl = () => {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Get the API URL from environment variables
  const envApiUrl = process.env.REACT_APP_API_URL;
  
  // Log for debugging
  console.log('Config - Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_API_URL: envApiUrl,
    isDevelopment
  });
  
  // If we have an environment variable, use it
  if (envApiUrl) {
    return envApiUrl;
  }
  
  // Otherwise, use a default based on environment
  return 'https://homebuddy-backend-1.onrender.com/api';
};

// Export configuration
const config = {
  apiUrl: getApiUrl(),
  appName: process.env.REACT_APP_NAME || 'HomeBuddy',
  appVersion: process.env.REACT_APP_VERSION || '1.0.0'
};

// Log the final configuration
console.log('Using configuration:', config);

export default config; 