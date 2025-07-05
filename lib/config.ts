// Configuration for API base URL
export const getApiBaseUrl = () => {
  // In development, use localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // In production, use the deployed URL
  // You can set this via environment variable or use the current origin
  return process.env.NEXT_PUBLIC_API_URL || 
         (typeof window !== 'undefined' ? window.location.origin : '');
};

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  UPDATE_PASSWORD: '/api/auth/update-password',
  UPDATE_NAME: '/api/auth/update-name',
  DELETE_ACCOUNT: '/api/auth/delete-account',
  UPDATE_MATCH_SCORE: '/api/auth/update-match-score',
  RESUME_UPLOAD: '/api/analyze/resumeupload',
  RESUME_GET: '/api/analyze/resumeget',
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  return `${getApiBaseUrl()}${endpoint}`;
}; 