export async function upload(file: FormData, token: string | null) {
  try {
        const response = await fetch('http://localhost:3000/api/analyze/resumeupload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: file
        });
        return await response;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
    }
}
