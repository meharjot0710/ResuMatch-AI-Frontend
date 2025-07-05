import { getApiUrl, API_ENDPOINTS } from '@/lib/config';

export const updateName = async (name: string, token: string) => {
  try {
    const response = await fetch(getApiUrl(API_ENDPOINTS.UPDATE_NAME), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update name');
    }

    return data;
  } catch (error) {
    console.error('Error updating name:', error);
    throw error;
  }
}; 