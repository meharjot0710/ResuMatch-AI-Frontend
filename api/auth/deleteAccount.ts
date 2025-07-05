export const deleteAccount = async (password: string, token: string) => {
  try {
    const response = await fetch('/api/auth/delete-account', {
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