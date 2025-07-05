import { getApiUrl, API_ENDPOINTS } from '@/lib/config';

export async function upload(file: FormData, token: string | null) {
  try {
    const response = await fetch(getApiUrl(API_ENDPOINTS.RESUME_UPLOAD), {
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
