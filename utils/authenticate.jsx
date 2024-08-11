"use server"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const SECRET = process.env.SECRET_KEY;

export default async function getCookie(){
    const cookieFound = cookies().get("loginCookie")
    if(cookieFound){
        const cookiedecoded = jwt.verify(cookieFound.value, SECRET);
        if(!cookiedecoded.admin){
            redirect("/");            
        }
    } else {
        redirect("/login");
    }
}