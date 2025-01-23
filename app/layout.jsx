import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.scss";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Botonera from "./_component/botonera";

const SECRET = process.env.SECRET_KEY;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Red Dev Redemption",
  description: "Nero's Personal Blog",
};

export default function RootLayout({ children }) {

  let logged = false;
  let admin = false;
  const cookieFound = cookies().get("loginCookie")
  if(cookieFound){
    logged = true;
    const cookiedecoded = jwt.verify(cookieFound.value, SECRET);
    if(cookiedecoded.admin){
      admin = true;
    }
    console.log(cookiedecoded);
  }



  return (
    <html className="dark" lang="en">

      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/ring.js"></script>
      </head>

      <body className={inter.className}>

        <nav className="mb-8 flex justify-between items-center border-b-2 border-amber-500">
          <div className="flex flex-row items-center">
            <Link href="/" prefetch={false}>
              <Image
                src="/logo.svg"
                width={500}
                height={500}
                alt="logo"
                className="logo"
              ></Image>
            </Link>

            {
              admin?
              <Link className="underline" href="/admin">
                POST ADMIN
              </Link>
              :
              <></>
            }
          </div>

          <Botonera logged={logged}></Botonera>

        </nav>

        {children}

        <footer className="mt-3 flex justify-center text-center border-t-2 border-amber-500">
          <div className="flex mb-3 flex-col align-center justify-center text-center">
            <div className="flex justify-evenly mt-4 mx-4 pb-4 mb-2 border-b border-amber-500 rounded">
              <svg className="h-9" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#fbbf24" stroke="none">
                <path d="M2315 5109 c-800 -83 -1501 -518 -1927 -1196 -604 -961 -490 -2237
                274 -3068 425 -462 951 -737 1583 -827 119 -17 512 -16 635 1 622 86 1148 360
                1572 820 349 378 572 862 650 1406 17 118 17 512 0 630 -59 416 -191 769 -410
                1099 -92 140 -185 254 -315 385 -399 404 -893 653 -1462 737 -123 18 -478 26
                -600 13z m27 -1592 c207 -302 379 -549 382 -550 3 -1 218 246 479 548 l473
                550 128 3 c75 1 126 -1 124 -7 -1 -5 -123 -148 -269 -317 -146 -170 -390 -454
                -542 -631 l-277 -321 531 -774 c292 -425 560 -815 596 -865 l64 -93 -439 0
                -439 0 -398 580 c-219 319 -401 580 -404 579 -3 0 -229 -260 -501 -577 l-496
                -577 -132 -3 -132 -3 574 668 574 667 -32 46 c-36 49 -1071 1557 -1101 1603
                l-17 27 438 -2 439 -3 377 -548z"/>
                <path d="M2359 2558 l918 -1313 196 -3 c108 -1 197 1 197 5 0 5 -411 595 -913
                1313 l-913 1305 -202 3 -201 2 918 -1312z"/>
                </g>
              </svg>
              <svg className="h-9" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#fbbf24" stroke="none">
                <path d="M2321 5110 c-868 -84 -1644 -610 -2037 -1382 -139 -273 -221 -536
                -266 -853 -20 -140 -17 -504 6 -660 39 -278 121 -541 247 -794 249 -502 647
                -900 1150 -1150 815 -406 1779 -350 2539 147 297 194 579 482 771 788 74 116
                184 342 234 478 51 138 110 376 131 531 23 157 26 521 6 660 -59 415 -191 769
                -410 1099 -92 140 -185 254 -315 385 -399 403 -895 653 -1462 737 -122 18
                -466 26 -594 14z m574 -1625 c233 -6 515 -31 585 -51 120 -35 235 -120 279
                -208 42 -86 81 -403 81 -664 0 -250 -41 -585 -80 -662 -47 -93 -154 -176 -270
                -210 -268 -80 -1592 -80 -1860 0 -116 34 -223 117 -270 210 -39 77 -80 413
                -80 660 0 271 41 588 87 673 51 92 176 180 297 207 122 27 729 61 961 53 50
                -1 171 -5 270 -8z"/>
                <path d="M2250 2560 l0 -492 48 29 c146 86 751 459 751 463 0 4 -605 377 -751
                463 l-48 29 0 -492z"/>
                </g>
              </svg>
              <svg className="h-9" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#fbbf24" stroke="none">
                <path d="M2315 5109 c-800 -83 -1501 -518 -1927 -1196 -604 -960 -491 -2229
                272 -3065 423 -463 951 -740 1585 -830 118 -17 511 -16 635 0 579 80 1097 337
                1491 739 130 132 157 163 243 277 256 341 423 757 488 1211 17 118 17 512 0
                630 -43 303 -122 561 -247 814 -134 268 -270 459 -483 674 -395 400 -889 649
                -1457 733 -123 18 -478 26 -600 13z m848 -1089 c288 -19 456 -82 610 -228 156
                -149 228 -332 247 -629 13 -195 13 -1006 0 -1204 -19 -300 -93 -485 -253 -636
                -149 -141 -321 -205 -604 -223 -192 -12 -1014 -12 -1206 0 -288 19 -456 82
                -610 228 -156 149 -228 332 -247 629 -13 194 -12 1028 0 1212 20 293 92 475
                247 623 148 140 325 210 582 227 169 12 1061 12 1234 1z"/>
                <path d="M2195 3759 c-300 -6 -349 -9 -416 -27 -213 -58 -334 -178 -391 -391
                -18 -67 -21 -117 -27 -429 -3 -193 -3 -511 0 -705 6 -311 9 -361 27 -428 57
                -213 178 -334 391 -391 67 -18 117 -21 429 -27 193 -3 511 -3 705 0 313 6 361
                9 430 28 207 55 333 180 389 388 18 70 21 116 27 431 3 193 3 511 0 705 -6
                312 -9 361 -27 428 -57 213 -179 335 -391 391 -78 20 -98 21 -661 31 -80 1
                -298 -1 -485 -4z m1212 -250 c38 -14 83 -57 99 -96 49 -113 -38 -243 -161
                -243 -94 0 -175 80 -175 174 0 121 124 208 237 165z m-604 -236 c121 -42 188
                -85 283 -178 92 -91 149 -181 191 -300 26 -74 28 -91 28 -235 0 -144 -2 -161
                -28 -235 -40 -115 -100 -209 -186 -296 -87 -86 -181 -146 -296 -186 -74 -26
                -91 -28 -235 -28 -144 0 -161 2 -235 28 -119 42 -209 99 -300 191 -93 95 -135
                162 -179 283 -30 85 -31 94 -31 243 1 141 3 162 28 235 52 155 163 301 297
                390 146 97 251 126 440 122 120 -3 144 -7 223 -34z"/>
                <path d="M2442 3034 c-263 -70 -423 -334 -357 -588 48 -183 178 -313 362 -361
                344 -90 678 244 588 588 -70 267 -337 430 -593 361z"/>
                </g>
              </svg>
            </div>
                <p>nerowork16@gmail.com</p>
            <h4 className="mx-4">Created and supported by Facundo Furlan</h4>
          </div>
        </footer>

      </body>
    </html>
  );
}
