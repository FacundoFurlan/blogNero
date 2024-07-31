import "@/app/globals.scss";

export default function Page(){
    const handleSubmit = async (formData) => {
        "use server"
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("http://localhost:3000/register/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            console.log("User registered:", result);
        } catch (error) {
            console.log("error registering user:", error)
        }
    }

    return(
        <main className="flex flex-col items-center min-h-[80vh]">
            <h2 className="text-2xl mb-6">Name yourself!</h2>
            <form action={handleSubmit} method="POST" className="flex flex-col text-lg w-[80vw] md:w-[50vw] lg:w-[50vw] xl:w-[30vw] border card-bg px-8">
                <label className="self-center m-4" htmlFor="name">Name</label>
                <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="text" placeholder="Username" name="name" />
                <label className="self-center m-4" htmlFor="email">Email</label>
                <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="text" placeholder="arthur69@gmail.com" name="email" />
                <label className="self-center m-4" htmlFor="password">Password</label>
                <input className="py-2 px-3 border focus:outline-none focus:outline-red-800 focus:outline-offset-0 input-bg rounded border-amber-400" type="text" placeholder="***********" name="password" />
                <button className="m-6 border-2 border-red-800 bg-amber-400 font-extrabold rounded-full max-w-fit self-center py-2 px-4 text-red-800" type="submit">Register</button>
            </form>
        </main>
    )
}