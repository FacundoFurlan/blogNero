import { connectDB } from "@/utils/mongo";
import postModel from "@/models/post";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request){
    const options = {
        page: 1,
        limit: 3,
        sort: {
            createdAt: -1
        }
    }
    await connectDB()

    try {
        const threeNewestPosts = await postModel.paginate({}, options);
        console.log("postModel: ",threeNewestPosts.totalDocs);
        revalidatePath("/")
        return NextResponse.json({result: threeNewestPosts})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message, {status: 400});
    }
}