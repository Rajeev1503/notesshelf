import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";
import logo from "/public/icons/icon-512x512.png";

export default function Account() {
  const [currentPage, setCurrentPage] = useState(showLogin);

  function showLogin() {
    return (
      <div>
        <Head>
          <title>NotesShelf</title>
        </Head>
        <div
          className="bg-[#000] flex flex-col justify-center items-center"
          style={{ height: "100vh" }}
        >
          <div className="w-1/4 max-h-min">          <Link href="/" className="text-white flex flex-col gap-2 items-center font-semibold">
        <Image src={logo} height={40} width={40} />
      </Link>
            <SignIn showSignUp={() => setCurrentPage(showSignUp())} />
          </div>
        </div>
      </div>
    );
  }
  function showSignUp() {
    return (
      <div>
        <Head>
          <title>NotesShelf</title>
        </Head>
        <div
          className="bg-[#000] flex flex-col justify-center items-center"
          style={{ height: "100vh" }}
        >
          <div className="w-1/4 max-h-min">
          <Link href="/" className="text-white flex flex-col gap-2 items-center font-semibold">
        <Image src={logo} height={40} width={40} />
      </Link>
            <SignUp showLogin={() => setCurrentPage(showLogin())} />
          </div>
        </div>
      </div>
    );
  }

  return <>{currentPage}</>;
}
