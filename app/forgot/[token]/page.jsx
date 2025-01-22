"use client"
import "@/app/globals.scss";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import handleTokenConfirm from "./_component/handleTokenConfirm";
import handleChangePass from "./_component/handleChangePass";


export default function Page({params}) {
    console.log(params);
    const hasRun = useRef(false) // This one checks if the effect has run out or not (becouse in certain environments the code render itself 2 times)
    const [invalid, setInvalid] = useState(true);
    const [error, setError] = useState("");

    const [errorMessage, setErrorMessage] = useState(""); //This useState sees if there was an error on the new password proccess and storage the message in case it happens
    const [errorCount, setErrorCount] = useState(0); 
    const [fontSize, setFontSize] = useState(""); 
    const [loading, setLoading] = useState(false);

    const router = useRouter(); //This useRouter is used to redirect the user to the front page in case they change the password correctly

    const handleTokenConfirmation = async (params) => {
        const result = await handleTokenConfirm(params); 
        console.log("handle result: ", result);
        return(result)
    } 

    useEffect(()=> {
        if(hasRun.current){  //if it has already run out, you just skip this
            return
        }

        hasRun.current = true;

        handleTokenConfirmation(params).then(res => {  //Checks if the token is correct or not
            setInvalid(res.error);
            console.log("Invalid: " , invalid)
            if(res.error){
                setError(res.errorMessage);
            }
        });
    }, [])

    async function formAction(formData){ //This function is used to manage the response of the server action
        const response = await handleChangePass(formData); //call to the server action

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


    return (
        <main className="min-w-full min-h-screen flex flex-col items-center">
            {
                invalid?
                <div>
                    <h1>{error}</h1>
                </div>
    
                :
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl mb-6">Get your new password!</h2>
                    <form action={formAction} onSubmit={()=>{setLoading(true)}} className="flex flex-col text-lg w-[80vw] md:w-[50vw] lg:w-[50vw] xl:w-[30vw] border card-bg px-8">
                        <p className={`${fontSize} mt-4 ease-in-out duration-300 text-center underline underline-offset-2 text-amber-400`}>{errorMessage}</p>

                        <label className="self-center m-4" htmlFor="email">New Password:</label>
                        <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="password" placeholder="***********" name="password" />

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
                                <button className="mb-6 lg:mb-0 border-2 border-red-800 bg-amber-400 font-extrabold text-nowrap rounded-xl max-w-fit self-center py-1 px-6 text-red-800" type="submit">Change Password</button> 
                            </div>

                        }
                    </form>
                </div>
            }

        </main>
    );
}