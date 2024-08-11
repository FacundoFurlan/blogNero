"use client"

export default function UserProfile({cookiedecoded}){
    return(
        <main className=" min-w-full min-h-screen flex mt-16 flex-col items-center min-h-[80vh]">
            <h2 className="text-4xl mb-6 text-amber-400">This is you!</h2>
            <h4>{cookiedecoded.name}</h4>
            <h4>{cookiedecoded.email}</h4>
        </main>
    )
}