import "./globals.scss";
import PostCard from "./_component/post";

export default function Home() {
  return (
    <main className="min-w-full min-h-screen flex flex-col items-center">
      <h1 className="text-4xl text-center m-8">Red Dev Redemption</h1>
      <p>A developer's diary</p>
      <PostCard title={"Jugué Red Dead Redemption 2"} description={"lorem ipsum data laca ouw wu uwu muwu tuku tuki tiku taka"} date={"Jul 8 2024"} imgPath={"/rdr2.png"}></PostCard>
      <PostCard title={"Jugué Cocoon!"} description={"lorem ipsum data laca ouw wu uwu muwu tuku tuki tiku taka lorem ipsum data laca ouw wu uwu muwu tuku tuki tiku taka "} date={"Jul 8 2024"} imgPath={"/cocoon.png"}></PostCard>
    </main>
  );
}