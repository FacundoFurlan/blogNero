"use server"
export default async function deletePost(formData){
    const data = Object.fromEntries(formData);
    console.log("datos: ", data)
    console.log(typeof(data.name))

    //id checks
    if(data.id === ""){
        return({error: true, errorMessage: "You need an Id"});
    }


    try {
        const res = await fetch("http://localhost:3000/admin/api/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("Post Deleted: ", result);

        if(result.error){
            return({error: true, errorMessage: `Id "${data.id}" does not exists`});
        }
    } catch (error) {
        console.log("error creating Post:", error)
    }
}