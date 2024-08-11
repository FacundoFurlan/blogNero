"use server"
import "@/app/globals.scss";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const SECRET = process.env.SECRET_KEY;

export default async function getLike(postId) {
  const cookieFound = cookies().get("loginCookie")
  let userId = null;
  if(cookieFound){
      const cookiedecoded = jwt.verify(cookieFound.value, SECRET);
      userId = cookiedecoded.id;          
  
      const res = await fetch(`http://localhost:3000/likes/${postId}/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      });
    
      const response = await res.json();
      console.log("get like: ", response);
      return(response);
  } else {
     return(false)
  }

}