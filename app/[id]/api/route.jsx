import postModel from "@/models/post";
import { connectDB } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    console.log(params)
    await connectDB()

    try {
        const post = await postModel.findById(params.id);
        console.log("post found: ", post);

        return NextResponse.json(post)
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message, {status: 400});
    }
}