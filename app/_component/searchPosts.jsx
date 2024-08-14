"use server"
import "@/app/globals.scss";
import { revalidatePath } from "next/cache";


export default async function searchPosts() {

  const res = await fetch("https://blog-nero.vercel.app/api/", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    cache: "no-store"
  });
  
  const result = await res.json();
  console.log("result: ", result.result.totalDocs);
  revalidatePath("/")
  return(result.result)
}