export async function signup(target:any){
    const name=target.name.value;
    const email=target.email.value;
    const password=target.password.value;
    
    // Get API URL based on environment
    const getApiUrl = () => {
        if (typeof window !== 'undefined') {
            // Client-side: use current origin
            return window.location.origin;
        }
        // Server-side: use environment variable or default
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    };
    
    const response = await fetch(`${getApiUrl()}/api/auth/signup`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ name, email, password })
    });
    const data = response.json();
    return data;
}