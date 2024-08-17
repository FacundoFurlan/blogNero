import "@/app/globals.scss";
import Link from "next/link";

export default function PostCard({title, description, date, imgPath, id, note}){
    return(
        <div className="m-8 mt-4 w-[80vw] lg:w-[50vw] flex flex-col justify-center items-center">
            <div className="max-w-sm w-full lg:max-w-full lg:flex card-bg">
            <div className="card-bg p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                <div className="flex flex-col lg:flex-row items-center mb-4">
                    <img src={imgPath} className="h-20 m-2 lg:mr-6" alt="" />
                    <div className=" lg:max-w-min text-white text-center font-bold text-xl lg:text-nowrap lg:truncate inline border-b-2 border-amber-400 rounded"><Link href={`/${id}`}>{title}</Link></div>
                </div>
                <p className="text-white text-base line-clamp-2">{description}</p>
                </div>
                {
                    note?
                    <div className="flex justify-between">
                        <div className="text-sm">
                            <p className="text-white leading-none">Facundo Furlan</p>
                            <p className="text-amber-400">{date}</p>
                        </div>
                        <div className="text-sm items-center justify-center">
                            <p className="text-amber-400">Nota: {note}</p>
                        </div>
                    </div>
                    :
                    <div className="flex">
                        <div className="text-sm">
                            <p className="text-white leading-none">Facundo Furlan</p>
                            <p className="text-amber-400">{date}</p>
                        </div>
                    </div>
                }

            </div>
            </div>
        </div>
    )
}