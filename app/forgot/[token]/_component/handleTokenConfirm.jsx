"use server"
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.SECRET_KEY;

export default async function handleTokenConfirm(params) {
    try {
        const cookieFound = cookies().get("tokenForgot") //take the token storaged on navigator
        let cookiedecoded = null
        if(cookieFound){ //if a token was found
          cookiedecoded = jwt.verify(cookieFound.value, SECRET); 
          console.log("cookie decoded:  " ,cookiedecoded);
          if(cookiedecoded.tokenC){
            if(cookiedecoded.tokenC == params.token){ //we need to validate that the token on the url is the same that the one we have storaged
                return({error: false, errorMessage: "Invalid Id"}); //if it is valid, then we say that there was no error
            }
          }
        }
        return({error: true, errorMessage: "Invalid ID"}) //if something failed, there was an error
    } catch (error) {
        console.log("error handling tokenForgot confirm:", error)
        return({error: true, errorMessage: error.message})
    }


}