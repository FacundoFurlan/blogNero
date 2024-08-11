"use client"
import "@/app/globals.scss";
import PostCard from "@/app/_component/post";
import { useEffect, useState } from "react";
import Paginador from "@/app/_component/paginador";

export default function Page({params}) {
    const [posts, setPosts] = useState({docs: []});
    console.log(params)

    async function searchPosts() {

    const res = await fetch(`http://localhost:3000/post/${params.id}/api/`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
    });
    
    const result = await res.json();
    console.log("result: ", result.result.totalDocs);
    return(result.result)
  }
  
  const search = async () => {
    const resp = await searchPosts() //this will search for the latest 3 posts
    setPosts(resp); //this will update the state of the posts objet
    console.log("post search: ", resp.docs);
  }

  useEffect(()=>{ //I want this to execute on the first render
    search();
  }, []) //the empty array says that this will only execute on first render

  return (
    <main className="min-w-full min-h-screen flex flex-col items-center">
      <h1 className="text-4xl text-amber-400 text-center mt-8 mb-4">Here are all de Posts!</h1>
      {
        posts.docs.length < 1?
        <div className="my-16">
          <l-ring
            size="80"
            stroke="5"
            bg-opacity="0"
            speed="2"
            color="white" 
          ></l-ring>

        </div> 
        :
        <div>
            {
                posts.docs.map((post) => <PostCard key={post._id} title={post.name} description={post.description} date={post.date} imgPath={post.image} id={post._id}></PostCard>)
            }
            <Paginador posts= {posts}></Paginador>
        </div>
      }
    </main>
  );
}