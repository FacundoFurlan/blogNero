"use server"
import "@/app/globals.scss";

export default async function likesConsult(postId) {
  const res = await fetch(`http://localhost:3000/likes/${postId}/api/`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
  });
  
  const result = await res.json();
  console.log("result how many likes: ", result);
  return(result);
}