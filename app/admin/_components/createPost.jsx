"use server"

export default async function createPost (formData) {
    const data = Object.fromEntries(formData);
    console.log("datos: ", data)
    console.log(typeof(data.name))

        //name checks
        if(data.name === ""){
            return({error: true, errorMessage: "You need a name"});
        }
        if(data.name.length < 4 || data.name.length > 50){
            return({error: true, errorMessage: "Name must have between 4 and 50 digits"});
        }

        //author checks
        if(data.author === ""){
            return({error: true, errorMessage: "You need an Author"});
        }
        if(data.author.length < 4 || data.author.length > 20){
            return({error: true, errorMessage: "Author must have between 4 and 20 digits"});
        }

        //description checks
        if(data.description === ""){
            return({error: true, errorMessage: "You need a Description"});
        }

        //image checks
        if(data.image === ""){
            return({error: true, errorMessage: "You need an Image"});
        }
        if( /\s/.test(data.image )){
            return({error: true, errorMessage: "Image can't have spaces"});
        }

        //date checks
        if(data.date === ""){
            return({error: true, errorMessage: "You need a Date"});
        }

    try {
        const res = await fetch("https://blog-nero.vercel.app/admin/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("Post Created: ", result);
        return({error: false});
    } catch (error) {
        console.log("error creating Post:", error)
        return({error: true, errorMessage: error.message});
    }
}