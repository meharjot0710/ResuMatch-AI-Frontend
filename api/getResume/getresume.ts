export async function getresume(token: string | null){
    // Get API URL based on environment
    const getApiUrl = () => {
        if (typeof window !== 'undefined') {
            // Client-side: use current origin
            return window.location.origin;
        }
        // Server-side: use environment variable or default
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    };
    
    const response = await fetch(`${getApiUrl()}/api/analyze/resumeget`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
}