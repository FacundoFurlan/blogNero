"use server"

import "@/app/globals.scss";
import { cookies } from "next/headers";

export async function handleSubmit(formData) {
    const data = Object.fromEntries(formData); //Takes all the input data and forms an object with them

    const res = await fetch("http://localhost:3000/login/api/user", { //fetch to the api
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const result = await res.json();  //getting results

    console.log("Login completed", result);

    if(result.createCookie){  //if the authentication went okey, we must create a Cookie
        cookies().set("loginCookie", result.token, {httpOnly: true, maxAge: 3600})
        return {message: "god", error: false} //We return no error
    } else { //if not
        return {error: true, message: result.message} //we return an error and its message
    }
}