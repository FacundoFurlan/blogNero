"use server"
import "@/app/globals.scss";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const SECRET = process.env.SECRET_KEY;

export default async function postLike(postId) {
  const cookieFound = cookies().get("loginCookie")
  let userId = null;
  if(cookieFound){
      const cookiedecoded = jwt.verify(cookieFound.value, SECRET);
      userId = cookiedecoded.id;          
  } else {
      redirect("/login");
  }

  const res = await fetch(`https://blog-nero.vercel.app/likes/${postId}/${userId}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
  });
  
  const response = await res.json();

  console.log("post like: ", response);
  return(response);
}