import likeModel from "@/models/like";
import { connectDB } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    console.log(params)
    await connectDB()

    try {
        const likesOnPost = await likeModel.find({post: params.post}).countDocuments();
        console.log("likes founded: ", likesOnPost);
        return NextResponse.json(likesOnPost);
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message, {status: 400});
    }
}