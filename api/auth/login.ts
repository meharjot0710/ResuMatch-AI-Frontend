export async function login(target:any){
    const email=target.email.value;
    const password=target.password.value;
    const response = await fetch('http://localhost:3000/api/auth/login',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = response.json();
    return data;
}