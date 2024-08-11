"use client"
import "@/app/globals.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import createPost from "../../_components/createPost";

export default function CreatePage(){
    const [errorMessage, setErrorMessage] = useState(""); //This useState sees if there was an error on the sign in proccess and storage the message in case it happens
    const [errorCount, setErrorCount] = useState(0); 
    const [fontSize, setFontSize] = useState(""); 
    
    const router = useRouter()


    async function formAction(formData){ //This function is used to manage the response of the server action
        const response = await createPost(formData); //call to the server action
        console.log("respuesta: ",response)

        if(!response.error){ //If there was no error, then, redirect to home page
            router.push("/")
        } else { //If there was an error, then, set the error message
            if(errorMessage === response.errorMessage){ //if the error message keeps happening, the font size will increase
                setErrorCount(errorCount+1)
                if(errorCount+1 == 1){
                    setFontSize(" text-2xl ");
                }
                if(errorCount+1 == 2){
                    setFontSize(" text-3xl ")
                }
                if(errorCount+1 == 3){
                    setFontSize(" text-4xl ")
                }
                if(errorCount+1 == 4){
                    setFontSize(" text-5xl ")
                }
                if(errorCount+1 == 5){
                    setFontSize(" text-6xl ")
                }
            }else {
                setErrorCount(0)
                setFontSize("")
            }
            setErrorMessage(response.errorMessage);
        }
    }

    return(
        <main className="flex flex-col items-center">
            <h2 className="mb-2 text-2xl">Create a Post!</h2>
            <form action={formAction} className="flex flex-col text-lg w-[80vw] md:w-[50vw] lg:w-[50vw] xl:w-[30vw] border card-bg px-8">
                <p className={`${fontSize} mt-4 ease-in-out duration-300 text-center underline underline-offset-2 text-amber-400`}>{errorMessage}</p>
                <label className="self-center m-4" htmlFor="name">Name</label>
                <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="text" placeholder="A new Post" name="name" />
                <label className="self-center m-4" htmlFor="author">Author</label>
                <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="text" placeholder="Shakespeare" name="author" />
                <label className="self-center m-4" htmlFor="description">Description</label>
                <textarea className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="text" placeholder="A long text" name="description" />
                <label className="self-center m-4" htmlFor="image">Image</label>
                <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="text" placeholder="url" name="image" />
                <label className="self-center m-4" htmlFor="date">Date</label>
                <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="text" placeholder="Jul 8 2024" name="date" />
                <label className="self-center m-4" htmlFor="note">Note</label>
                <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="text" placeholder="9" name="note" />
                <div className="flex my-10 flex-col lg:justify-center lg:flex-row">
                    <button className="mb-6 lg:mb-0 border-2 border-red-800 bg-amber-400 font-extrabold text-nowrap rounded-xl max-w-fit self-center py-1 px-6 text-red-800" type="submit">Create</button> 
                </div>
            </form>
        </main>
    )
}