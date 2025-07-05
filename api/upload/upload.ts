export async function upload(file: FormData, token: string | null) {
  try {
    const response = await fetch("http://localhost:3000/api/analyze/resumeupload", {
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
