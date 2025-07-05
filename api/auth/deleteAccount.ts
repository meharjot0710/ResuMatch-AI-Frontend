export const deleteAccount = async (password: string, token: string) => {
  try {
    // Get API URL based on environment
    const getApiUrl = () => {
        if (typeof window !== 'undefined') {
            // Client-side: use current origin
            return window.location.origin;
        }
        // Server-side: use environment variable or default
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    };
    
    const response = await fetch(`${getApiUrl()}/api/auth/delete-account`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete account');
    }

    return data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
}; 