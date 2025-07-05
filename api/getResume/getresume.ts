import { getApiUrl, API_ENDPOINTS } from '@/lib/config';

export async function getresume(token: string | null){
    const response = await fetch(getApiUrl(API_ENDPOINTS.RESUME_GET), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
}