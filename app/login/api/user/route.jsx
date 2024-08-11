import { connectDB } from "@/utils/mongo";
import userModel from "@/models/user"
import {isValidPassword} from "@/utils/bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY;

import { NextResponse } from "next/server";

export async function POST(request){
    connectDB(); //connecting to the db

    const data = await request.json(); //getting the log in data

    const user = await userModel.findOne({email: data.email}); //searching for matching email
    if(user){ //if the email matches
        if(isValidPassword(user, data.password)){ //matching passwords
            const token = jwt.sign({ //creating token
                email: user.email,
                id: user._id,
                admin: user.admin,
                name: user.name
            },
                SECRET,
                {expiresIn: "1h"
            });
            return NextResponse.json({status: 200, success: true, message: "Login successful", createCookie: true, token: token}); //sending token
        } else{ //if incorrect password
            return NextResponse.json({status:200, success:true, message: "Incorrect Password", createCookie: false, token: null});
        }
    } else { //if email not registered
        return NextResponse.json({status:200, success:true, message: "User does not exist", createCookie: false, token: null});
    }

}