export async function getresume(token: string | null){
    const response = await fetch("http://localhost:3000/api/analyze/resumeget", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
}