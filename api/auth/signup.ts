export async function signup(target:any){
    const name=target.name.value;
    const email=target.email.value;
    const password=target.password.value;
    const response = await fetch('http://localhost:3000/api/auth/signup',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ name, email, password })
    });
    const data = response.json();
    return data;
}