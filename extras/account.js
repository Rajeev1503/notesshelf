import Head from "next/head";
import { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

export default function Account() {
  const [loginSignup, setLoginSignup] = useState(<SignIn />);
  const [loginActive, setLoginActive] = useState(true);

  return (
    <>
      <Head>
        <title>NotesShelf</title>
      </Head>
      <div
        className="bg-[#111] flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div className="rounded-lg border border-border-dark w-3/6 max-h-min overflow-hidden">
          <div className="flex flex-row justify-between items-center text-center bg-[#333] text-lighttext font-semibold text-sm">
            <div
              className={`${
                loginActive ? "bg-[#111] cursor-default" : "cursor-pointer"
              } flex-grow p-3`}
              onClick={() => {
                if (loginActive) {
                  return;
                }
                setLoginSignup(<SignIn />);
                setLoginActive(true);
              }}
            >
              SIGNIN
            </div>
            <div
              className={`${
                !loginActive ? "bg-[#111] cursor-default" : "cursor-pointer"
              } flex-grow p-3`}
              onClick={() => {
                if (!loginActive) {
                  return;
                }
                setLoginSignup(<SignUp />);
                setLoginActive(false);
              }}
            >
              SIGNUP
            </div>

          </div>
          <div className="px-5">{loginSignup}</div>
        </div>
      </div>
    </>
  );
}
