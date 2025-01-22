import userModel from "@/models/user";
import { connectDB } from "@/utils/mongo";
import { NextResponse } from "next/server";
const {createHash} = require("@/utils/bcrypt")

export async function POST(request){
    await connectDB();

    try {
        let data = await request.json();

        const emailCheck = await userModel.findOne({email: data.email});
        if(!emailCheck){
            return NextResponse.json({error: true, errorMessage: "Email didn't exist"})
        }

        data.password = createHash(data.password);
        const passwordChanged = await userModel.updateOne({email: data.email}, {password: data.password});

        return NextResponse.json({passwordChanged});
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message, {status: 400});
    }
}