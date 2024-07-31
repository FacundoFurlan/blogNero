import userModel from "@/models/user";
import { connectDB } from "@/utils/mongo";
import { NextResponse } from "next/server";
const {createHash} = require("@/utils/bcrypt")

export async function POST(request){
    await connectDB();

    try {
        let data = await request.json();
        data.password = createHash(data.password);
        const userData = new userModel(data);
        const savedUser = await userData.save();

        return NextResponse.json({savedUser});
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message, {status: 400});
    }
}