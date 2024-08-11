import likeModel from "@/models/like";
import { connectDB } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    console.log(params)
    await connectDB()

    try {
        const like = await likeModel.findOne({user: params.user, post: params.post});
        console.log("like found: ", like);
        return NextResponse.json(like)
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message, {status: 400});
    }
}
export async function POST(request, {params}){
    console.log(params)
    await connectDB()

    try {
        const newLike = new likeModel({user: params.user, post: params.post});
        result = await newLike.save();
        console.log("POST LIKE!  ",result)
        return NextResponse.json(result)
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message, {status: 400});
    }
}
export async function DELETE(request, {params}){
    console.log(params)
    await connectDB()

    try {
        result = await likeModel.deleteOne({user: params.user, post: params.post});
        return NextResponse.json(result)
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message, {status: 400});
    }
}