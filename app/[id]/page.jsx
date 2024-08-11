"use client"
import "@/app/globals.scss";
import { useEffect, useState } from "react";
import searchPost from "./_component/searchPost";
import getLike from "./_component/getLike";
import likesConsult from "../_component/likesConsult";
import postLike from "./_component/postLike";
import deleteLike from "./_component/deleteLike";


export default function Page({params}) {
  const [post, setPost] = useState(false);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(()=>{ //I want this to execute on the first render
    search();
    howManyLikes();
    getTheLike();
  }, []) //the empty array says that this will only execute on first render

  const search = async () => {
    const resp = await searchPost(params.id) //this will search for the latest 3 posts
    setPost(resp); //this will update the state of the posts objet
  }

  const howManyLikes = async () => {
    const resp = await likesConsult(params.id);
    setLikeCount(resp);
  }

  const getTheLike = async () => {
    const resp = await getLike(params.id);
    setLike(resp);

  }

  const postALike = async () => {
    if(loading){
      return;
    }
    setLoading(true);
    await postLike(post._id);
    setLike(true);
    setLikeCount(likeCount+1)
    setLoading(false)
  }

  const deleteALike = async () => {
    if(loading){
      return;
    }
    setLoading(true);
    await deleteLike(post._id);
    setLike(false);
    setLikeCount(likeCount-1)
    setLoading(false)
  }
  
  return (
    <main className="min-w-full min-h-screen flex flex-col items-center">
        {
            post?
            <div className="flex flex-col items-center mx-3">
                <img className="h-1/4" src={post.image} alt={post.name} />
                <h2 className="my-8 text-4xl text-amber-400 underline text-center">{post.name}</h2>
                <div className="flex flex-col divide-y divide-amber-400 items-center">
                  <div className="w-[80%] my-4 text-xl flex justify-between">
                    <div>
                        <h4>{post.author}</h4>
                        <h4>{post.date}</h4>
                    </div>
                    {
                      post.note?
                      <div className="flex justify-center items-center">
                        <h4 className="text-amber-400">Nota: {post.note}</h4>
                      </div>
                      :
                      <></>
                    }

                  </div>
                  <p className="mx-8 px-6 py-8 preWrap text-lg">{post.description}</p>
                </div>
                <div>
                  {
                    like?
                    <div className="flex items-center text-amber-400 ease-in-out duration-500 animate-bounce">
                      <button className="m-2" onClick={deleteALike}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </button>
                      <p className="text-white">{likeCount}</p>
                    </div>
                    :
                    <div className="flex items-center text-gray-400 ease-in-out duration-500 animate-bounce">
                      <button className="m-2" onClick={postALike}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                      </button>
                      <p className="text-white">{likeCount}</p>
                    </div>
                  
                  }
                </div>
            </div>
            :
            <div className="my-16">
              <l-ring
              size="80"
              stroke="5"
              bg-opacity="0"
              speed="2"
              color="white" 
              ></l-ring>
            </div> 
        }
    </main>
  );
}