"use server"

var nodemailer = require("nodemailer");
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.SECRET_KEY;
const MAIL = process.env.SECRET_MAIL;
const PASSWORD = process.env.SECRET_APP_PASS;

export default async function handleForgotPass (formData){
    const data = Object.fromEntries(formData);
    console.log("datos: ", data)

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

    try {
        // try to send the email
        const tokenConfirm = jwt.sign(data, SECRET, {expiresIn: "1h"}); // create the token with user data
        const  savedCookie = {tokenC: tokenConfirm}
        const savedCookieToken = jwt.sign(savedCookie, SECRET, {expiresIn: "1h"}) // creates the token thats going to the email
        cookies().set("tokenForgot", savedCookieToken, {httpOnly: true, maxAge: 3600}); // set it on navigator so we can check it later
    
        const transporter = nodemailer.createTransport({ // creates a trasporter for the email
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: MAIL,
              pass: PASSWORD,
            },
        });

        const mail = await transporter.sendMail({ // uses the transporter to send the email
            from: MAIL,
            to: data.email,
            replyTo: MAIL,
            subject: `Confirm your mail!`,
            html: `
                <div>
                    <h2>Confirm you want to change your password</h2>
                    <button><a href="https://blog-nero.vercel.app/forgot/${tokenConfirm}">Change Password!</a></button>
                    <p>If you dindt wanted to, just ignore this email</p>
                </div>
            `,
        })

        console.log("Change password email sended:", mail);
        return({error: false})
    } catch (error) {
        console.log("error sending the change password mail:", error)
        return({error: true, errorMessage: error.message})
    }
}