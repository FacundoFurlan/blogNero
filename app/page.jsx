"use client"
import "@/app/globals.scss";
import PostCard from "./_component/post";
import { useEffect, useState } from "react";
import searchPosts from "./_component/searchPosts";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  
  async function search () {
    const resp = await searchPosts() //this will search for the latest 3 posts
    setPosts(resp.docs); //this will update the state of the posts objet
    console.log("post search: ", resp.docs);
  }

  useEffect(()=>{ //I want this to execute on the first render
    search();
  }, []) //the empty array says that this will only execute on first render

  return (
    <main className="min-w-full min-h-screen flex flex-col items-center">
      <h1 className="text-4xl text-center mt-8 mb-4">Red Dev Redemption</h1>
      <p>A developer's diary</p>
      <h3 className="mt-6 mb-2 underline text-3xl text-amber-400">Latest posts!</h3>
      {
        posts.length < 1?
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
        posts.map((post) => <PostCard key={post._id} title={post.name} description={post.description} date={post.date} imgPath={post.image} id={post._id}></PostCard>)
      }
      <Link className="text-amber-400 mb-3 text-2xl" href={"/post/1"}>See more posts!</Link>
    </main>
  );
}