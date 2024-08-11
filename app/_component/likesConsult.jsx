"use server"
import "@/app/globals.scss";

export default async function likesConsult(postId) {
  const res = await fetch(`https://blog-nero.vercel.app/likes/${postId}/api/`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
  });
  
  const result = await res.json();
  console.log("result how many likes: ", result);
  return(result);
}