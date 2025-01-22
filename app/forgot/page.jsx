"use client"
import "@/app/globals.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import handleForgotPass from "./_serverComponent/handleForgotPass";

export default function Page(){
    const [errorMessage, setErrorMessage] = useState(""); //This useState sees if there was an error on the sign in proccess and storage the message in case it happens
    const [errorCount, setErrorCount] = useState(0); 
    const [fontSize, setFontSize] = useState(""); 
    const [loading, setLoading] = useState(false); 

    const router = useRouter(); //This useRouter is used to redirect the user to the front page in case they log in correctly

    async function formAction(formData){ //This function is used to manage the response of the server action
        const response = await handleForgotPass(formData); //call to the server action

        if(!response.error){ //If there was no error, then, redirect to home page
            router.push("/")
        } else { //If there was an error, then, set the error message
            setLoading(false)
            if(errorMessage === response.message){ //if the error message keeps happening, the font size will increase
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
            setErrorMessage(response.message);
        }
    }


    return(
        <main>
            <h2 className="text-2xl mb-6">Confirm your eMail</h2>
            <form action={formAction} onSubmit={()=>{setLoading(true)}} className="flex flex-col text-lg w-[80vw] md:w-[50vw] lg:w-[50vw] xl:w-[30vw] border card-bg px-8">
                <p className={`${fontSize} mt-4 ease-in-out duration-300 text-center underline underline-offset-2 text-amber-400`}>{errorMessage}</p>

                <label className="self-center m-4" htmlFor="email">Email</label>
                <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="email" placeholder="arthur69@gmail.com" name="email" />

                {
                    loading?
                    <div className="flex my-10 items-center justify-center">
                        <l-ring
                            size="80"
                            stroke="5"
                            bg-opacity="0"
                            speed="2"
                            color="white" 
                        ></l-ring>
                    </div>
                    :
                    <div className="flex my-10 flex-col lg:justify-between lg:flex-row">
                        <button className="mb-6 lg:mb-0 border-2 border-red-800 bg-amber-400 font-extrabold text-nowrap rounded-xl max-w-fit self-center py-1 px-6 text-red-800" type="submit">Send Mail</button> 
                    </div>

                }
            </form>
        </main>
    )
}

