import "@/app/globals.scss";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import DeletePage from "./_component/deletePage";

const SECRET = process.env.SECRET_KEY;

export default function Page(){
    const cookieFound = cookies().get("loginCookie")
    let cookiedecoded = null
    if(cookieFound){
      cookiedecoded = jwt.verify(cookieFound.value, SECRET);
      if(cookiedecoded.admin){
          return(
              <DeletePage></DeletePage>
          )
        } else {
            return(
                <main className="flex mt-16 flex-col items-center min-h-[80vh]">
                    <h2 className="text-4xl mb-6 text-amber-400">You must be an Admin!</h2>
                </main>
            )
        }
    } else{
        return(
            <main className="flex mt-16 flex-col items-center min-h-[80vh]">
                <h2 className="text-4xl mb-6 text-amber-400">You must login first!</h2>
            </main>
        )
    }

}