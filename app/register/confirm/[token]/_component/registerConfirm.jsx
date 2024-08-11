"use server"
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.SECRET_KEY;

export default async function registerConfirm(params) {
    try {
        const cookieFound = cookies().get("tokenConfirm")
        let cookiedecoded = null
        if(cookieFound){
          cookiedecoded = jwt.verify(cookieFound.value, SECRET);
          console.log("cookie decoded:  " ,cookiedecoded);
          if(cookiedecoded.tokenC){
            if(cookiedecoded.tokenC == params.token){
                const cookieDataDecoded = jwt.verify(params.token, SECRET);
                console.log(cookieDataDecoded);
    
                const res = await fetch("https://blog-nero.vercel.app/register/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(cookieDataDecoded)
                });
            
                const result = await res.json();
                console.log("Result was", result)
                if(result.error){
                    console.error("Error Registering user", result.errorMessage);
                    return({error: true, errorMessage: result.errorMessage})
                }
                return({error: false, errorMessage: "Invalid Id"});
            }
          }
        }
        return({error: true})
    } catch (error) {
        console.log("error registering user:", error)
        return({error: true, errorMessage: error.message})
    }


}