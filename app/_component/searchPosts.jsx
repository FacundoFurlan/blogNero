"use server"
import "@/app/globals.scss";


export default async function searchPosts() {

  const res = await fetch("https://blog-nero.vercel.app/api/", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    next: {revalidate: 10}
  });
  
  const result = await res.json();
  console.log("result: ", result.result.totalDocs);
  return(result.result)
}