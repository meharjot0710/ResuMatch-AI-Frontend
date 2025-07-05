// Simple utility for API URL handling
export const getApiBaseUrl = () => {
  // In development, use localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // In production, use the deployed URL
  return process.env.NEXT_PUBLIC_API_URL || 
         (typeof window !== 'undefined' ? window.location.origin : '');
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  return `${getApiBaseUrl()}${endpoint}`;
}; 