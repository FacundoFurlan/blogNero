"use server"
import "@/app/globals.scss";


export default async function searchPost(id) {

  const res = await fetch(`http://localhost:3000/${id}/api/`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
  });
  
  const result = await res.json();
  console.log("result: ", result);
  return(result);
}