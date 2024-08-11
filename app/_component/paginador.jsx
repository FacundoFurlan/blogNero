import Link from "next/link";

export default function Paginador({posts}){
    console.log("total pages: ", posts.totalPages)
    console.log("actual page: ", posts.page)
    return(
        <div className="flex flex-row items-center justify-center">
            {
                posts.page-2>0?
                <button className="text-amber-400 mx-2"><Link href={`/post/${posts.page-2}`}>{posts.page-2}</Link></button>
                :
                <button className="text-amber-400 mx-2" disabled>{"<<"}</button>
            }
            {
                posts.hasPrevPage?
                <button className="text-amber-400 mx-2"><Link href={`/post/${posts.prevPage}`}>{posts.prevPage}</Link></button>
                :
                <button className="text-amber-400 mx-2" disabled>{"<"}</button>
            }
            <h2 className="text-amber-400 mx-2">{posts.page}</h2>
            {
                posts.hasNextPage?
                <button className="text-amber-400 mx-2"><Link href={`/post/${posts.nextPage}`}>{posts.nextPage}</Link></button>
                :
                <button className="text-amber-400 mx-2" disabled>{">"}</button>
            }
            {
                posts.page+2 > posts.totalPages?
                <button className="text-amber-400 mx-2" disabled>{">>"}</button>
                :
                <button className="text-amber-400 mx-2"><Link href={`/post/${posts.page+2}`}>{posts.page+2}</Link></button>
            }
        </div>
    )
}