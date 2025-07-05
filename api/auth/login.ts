import { getApiUrl, API_ENDPOINTS } from '@/lib/config';

export async function login(target:any){
    const email=target.email.value;
    const password=target.password.value;
    const response = await fetch(getApiUrl(API_ENDPOINTS.LOGIN),{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    return data;
}