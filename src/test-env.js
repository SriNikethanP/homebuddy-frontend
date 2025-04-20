// This file is used to test if environment variables are being loaded correctly
console.log('Testing environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('All environment variables:', process.env);

// Export a function that can be called from other files
export const testEnv = () => {
  console.log('Testing environment variables from function:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  return {
    nodeEnv: process.env.NODE_ENV,
    apiUrl: process.env.REACT_APP_API_URL
  };
}; 