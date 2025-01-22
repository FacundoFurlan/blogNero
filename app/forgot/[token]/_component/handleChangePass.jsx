"use server"

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.SECRET_KEY;

export default async function handleChangePass (formData){
    const cookieFound = cookies().get("tokenConfirm") //Take the cookie with the token
    let cookieDecoded = null;
    let dataCookie = null;
    if(cookieFound){ //if you found the cookie
        cookieDecoded = jwt.verify(cookieFound.value, SECRET); //verify the token inside of it
        console.log("Cookie decoded: ", cookieDecoded);
        if(cookieDecoded.tokenC){ //chet if the second token is inside
            dataCookie = jwt.verify(cookieDecoded.tokenC, SECRET); //get the info in the second token
        }
    }
    if(dataCookie === null){
        return {error: true, errorMessage: "Error getting data cookie"} //if I didnt get any info, something went wrong
    }

    const data = Object.fromEntries(formData);
    console.log("datos: ", data)

    //password checks
    if(data.password === ""){
        return({error: true, errorMessage: "You need a password"});
    }
    if(data.password.length < 4 || data.password.length > 20){
        return({error: true, errorMessage: "Password must have between 4 and 20 digits"});
    }
    if( /\s/.test(data.password )){
        return({error: true, errorMessage: "Password can't have spaces"});
    }

    let dataRequest = {email: dataCookie.email, password: data.password}


    try {
        const res = await fetch("https://blog-nero.vercel.app/forgot/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataRequest)
        });
    
        const result = await res.json();
        console.log("Result was", result)
        if(result.error){
            console.error("Error Changing password", result.errorMessage);
            return({error: true, errorMessage: result.errorMessage})
        }
        return({error: false, errorMessage: "Invalid Id"});
    } catch (error) {
        console.log("error Changing password:", error)
        return({error: true, errorMessage: error.message})
    }
}