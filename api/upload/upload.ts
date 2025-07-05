export async function upload(file: FormData, token: string | null) {
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
    
    const response = await fetch(`${getApiUrl()}/api/analyze/resumeupload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: file,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error uploading resume:", error);
    throw error;
  }
}
