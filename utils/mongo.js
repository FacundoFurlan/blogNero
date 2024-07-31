require("dotenv").config()
import {connect, connection} from "mongoose"

const conn = {
    isConnected: false
}

export async function connectDB(){
    if (conn.isConnected) return;  //If already connected skip this function

    const db = await connect(process.env.MONGODB_URI); //connection string
    console.log(db.connection.db.databaseName);  //we store the state of our connection
}

connection.on("connected", ()=>{
    console.log("Mongoose is connected"); //DB connected alert
})

connection.on("error", (err) => {
    console.log("Error on connection", err) //DB Error alert
})