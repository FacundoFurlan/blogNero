"use client"
import "@/app/globals.scss";
import { useEffect, useRef, useState } from "react";
import registerConfirm from "./_component/registerConfirm";


export default function Page({params}) {
    console.log(params);
    const hasRun = useRef(false)
    const [invalid, setInvalid] = useState(true);
    const [error, setError] = useState("");

    const handleRegister = async (params) => {
        const result = await registerConfirm(params);
        console.log("handle result: ", result);
        return(result)
    } 

    useEffect(()=> {
        if(hasRun.current){
            return
        }

        hasRun.current = true;

        handleRegister(params).then(res => {
            setInvalid(res.error);
            console.log("Invalid: " , invalid)
            if(res.error){
                setError(res.errorMessage);
            }
        });
    }, [])




    return (
        <main className="min-w-full min-h-screen flex flex-col items-center">
            {
                invalid?
                <div>
                    <h1>{error}</h1>
                </div>
    
                :
                <div>
                    <h1>Account verified</h1>
                </div>
            }

        </main>
    );
}