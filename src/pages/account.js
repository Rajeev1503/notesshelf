import Head from "next/head";
import { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

export default function Account() {
  const [currentPage, setCurrentPage] = useState(showLogin);

  function showLogin() {
    return (
      <div>
        <Head>
          <title>NotesShelf</title>
        </Head>
        <div
          className="bg-[#111] flex flex-col justify-center items-center"
          style={{ height: "100vh" }}
        >
          <div className="w-1/4 max-h-min">
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
          className="bg-[#111] flex flex-col justify-center items-center"
          style={{ height: "100vh" }}
        >
          <div className="w-1/4 max-h-min">
            <SignUp showLogin={() => setCurrentPage(showLogin())} />
          </div>
        </div>
      </div>
    );
  }

  return <>{currentPage}</>;
}
