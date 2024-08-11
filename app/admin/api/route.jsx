import postModel from "@/models/post";
import { connectDB } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function POST(request){
    await connectDB();

    try {
        let data = await request.json();

        const postData = new postModel(data);
        const savedPost = await postData.save();

        return NextResponse.json({savedPost});
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message, {status: 400});
    }
}

export async function DELETE(request){
    await connectDB();
    try {
        let data = await request.json();
        console.log(data)
        const deletedPost = await postModel.findByIdAndDelete(data.id)

        return NextResponse.json({deletedPost})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({status: 400, error: true, errorMessage: error.message});
    }
}