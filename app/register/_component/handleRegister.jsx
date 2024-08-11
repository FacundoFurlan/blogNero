"use server"

var nodemailer = require("nodemailer");
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.SECRET_KEY;
const MAIL = process.env.SECRET_MAIL;
const PASSWORD = process.env.SECRET_APP_PASS;

export default async function handleRegister (formData){
    const data = Object.fromEntries(formData);
    console.log("datos: ", data)
    console.log(typeof(data.name))

    //name checks
    if(data.name === ""){
        return({error: true, errorMessage: "You need a name"});
    }
    if(data.name.length < 4 || data.name.length > 20){
        return({error: true, errorMessage: "Name must have between 4 and 20 digits"});
    }

    //email checks
    if(data.email === ""){
        return({error: true, errorMessage: "You need an email"});
    }
    if(data.email.length < 4 || data.email.length > 40){
        return({error: true, errorMessage: "Email must have between 4 and 40 digits"});
    }
    if( /\s/.test(data.email )){
        return({error: true, errorMessage: "Email can't have spaces"});
    }
    if( !(/@/.test(data.email ))){
        return({error: true, errorMessage: "Email needs @"});
    }

    //password checks
    if(data.password === ""){
        return({error: true, errorMessage: "You need a password"});
    }
    if(data.password.length < 4 || data.password.length > 20){
        return({error: true, errorMessage: "Password must have between 4 and 20 digits"});
    }
    if( /\s/.test(data.password )){
        return({error: true, errorMessage: "Password can't have spaces"});
    }

    


    try {

        const tokenConfirm = jwt.sign(data, SECRET, {expiresIn: "1h"});
        const  savedCookie = {tokenC: tokenConfirm}
        const savedCookieToken = jwt.sign(savedCookie, SECRET, {expiresIn: "1h"})
        cookies().set("tokenConfirm", savedCookieToken, {httpOnly: true, maxAge: 3600});
    
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: MAIL,
              pass: PASSWORD,
            },
        });

        const mail = await transporter.sendMail({
            from: MAIL,
            to: data.email,
            replyTo: MAIL,
            subject: `Confirm your mail!`,
            html: `
            <button><a href="https://blog-nero.vercel.app/register/confirm/${tokenConfirm}">Confirm!</a></button>
            `,
        })

        console.log("Confirm email sended:", mail);
        return({error: false})
    } catch (error) {
        console.log("error sending mail:", error)
        return({error: true, errorMessage: error.message})
    }
}