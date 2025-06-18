import User from "@/models/User";
import { verifyToken } from "../tokenVerify/verifytoken";

export async function upload(file:any, token:string | null) {
    const check=await verifyToken(token);
    console.log("Hello",check);
    const form= new FormData();
    form.append("file", file);
    const res = await fetch("http://localhost:3000/api/analyze/resumeupload", {
      method: "POST",
      body: form,
    });
    const data=await res.json();
    return data;
}