export const updatePassword = async (currentPassword: string, newPassword: string, token: string) => {
  try {
    const response = await fetch('/api/auth/update-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update password');
    }

    return data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}; 