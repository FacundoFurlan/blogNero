"use client"
import Link from "next/link";
import handleLogout from "./logout";

export default function Botonera({logged}){

    if(logged){
        return(
            <div>
                <button className="mr-4 p-1 text-red-800 px-3 bg-amber-400 border-2 border-red-800 rounded-full" onClick={() => {
                    handleLogout();
                }}>Log Out</button>
                <Link href={"/profile"} className="mr-4"><button className="p-1 px-3 border-2 rounded-full ">Profile</button></Link>
            </div>
        )
    }
    return(
        <div>
            <Link href={"/login"} className="mr-4"><button className="p-1 text-red-800 px-3 bg-amber-400 border-2 border-red-800 rounded-full ">Sign In</button></Link>
            <Link href={"/register"} className="mr-4"><button className="p-1 px-3 border-2 rounded-full ">Register</button></Link>
        </div>
    )
  }