import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY;

export default function Page(){
    const cookieFound = cookies().get("loginCookie")
    if(cookieFound){
        const cookiedecoded = jwt.verify(cookieFound.value, SECRET);
        if(!cookiedecoded.admin){
            redirect("/");            
        }
    } else {
        redirect("/login");
    }


    return(
        <main className="min-w-full min-h-screen flex flex-col items-center">
            <h2 className="mb-2 text-2xl">Choose One</h2>
            <Link className="mb-2 text-amber-400" href="/admin/create">Create a post</Link>
            <Link className="mb-2 text-amber-400" href="/admin/delete">Delete a post</Link>
        </main>
    )
}