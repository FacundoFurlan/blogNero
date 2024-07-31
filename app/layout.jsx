import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.scss";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Red Dev Redemption",
  description: "Nero's Personal Blog",
};

export default function RootLayout({ children }) {

  let logged = false;
  const cookieFound = cookies().get("loginCookie")
  if(cookieFound){
    logged = true;
    const cookiedecoded = jwt.verify(cookieFound.value, SECRET);
    console.log(cookiedecoded);
  }


  return (
    <html lang="en">

      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>

      <body className={inter.className}>

        <nav className="mb-8 flex justify-between items-center border-b-2 border-red-800">

          <Link href="/">
            <Image
              src="/logo.svg"
              width={500}
              height={500}
              alt="logo"
              className="logo"
            ></Image>
          </Link>

          {logged?
            <div>
              <Link href={"/login"} className="mr-4"><button className="p-1 text-red-800 px-3 bg-amber-400 border-2 border-red-800 rounded-full ">Log Out</button></Link>
              <Link href={"/register"} className="mr-4"><button className="p-1 px-3 border-2 rounded-full ">Profile</button></Link>
            </div>
          :
            <div>
              <Link href={"/login"} className="mr-4"><button className="p-1 text-red-800 px-3 bg-amber-400 border-2 border-red-800 rounded-full ">Sign In</button></Link>
              <Link href={"/register"} className="mr-4"><button className="p-1 px-3 border-2 rounded-full ">Register</button></Link>
            </div>
          }

        </nav>

        {children}

        <footer className="my-3 flex align-center justify-center">
          <p>Created and supported by Facundo Furlan</p>
        </footer>

      </body>
    </html>
  );
}
