import "@/app/globals.scss";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import UserProfile from "./_component/userProfile";

const SECRET = process.env.SECRET_KEY;

export default function Page(){
    const cookieFound = cookies().get("loginCookie")
    let cookiedecoded = null
    if(cookieFound){
      cookiedecoded = jwt.verify(cookieFound.value, SECRET);
      return(
          <UserProfile cookiedecoded={cookiedecoded}></UserProfile>
      )
    }
    
    if(!cookieFound){
        return(
            <main className="min-w-full min-h-screen flex mt-16 flex-col items-center min-h-[80vh]">
                <h2 className="text-4xl mb-6 text-amber-400">You must login first!</h2>
            </main>
        )
    }

}