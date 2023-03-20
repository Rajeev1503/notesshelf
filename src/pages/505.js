import Head from "next/head";
import Image from "next/image";
import logo from "../../public/icons/icon-512x512.png";
import Link from "next/link";
import { useContext } from "react";
import { BackgroundColorContext } from "@/context/backgroundColorContext";

export default function PageNotFound() {
  const backgroundColorContext = useContext(BackgroundColorContext);
  return (
    <>
      <Head>
        <title>505 Page - NotesMedium</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div
        className="bg-app-background flex flex-col w-full text-lighttext"
        style={{ height: "100vh" }}
      >
        <div className="p-2 border-b border-[#1a1a2e]">
        <div
      className={`flex flex-row justify-between items-center p-2 ${backgroundColorContext.backgroundColorState.main_text}`}
    >
      <div className="sm:w-1/4 max-w-max font-bold py-1">
        <Link
          className="max-w-max flex justify-start items-center gap-1"
          href="/"
        >
          <Image src={logo} alt="logo" height={20} width={20} />
          <p
            className={`hidden md:inline-block text-xs md:text-normal ${backgroundColorContext.backgroundColorState.accent_text_color}`}
          >
            NotesShelf
          </p>
        </Link>
      </div>
      </div>
        </div>
        <div
          className="flex sm:flex-row flex-col w-full h-full"
          style={{ height: "90vh" }}
        >
          <div className="scrollbarfeature sm:w-2/3 lg:w-5/6 w-full h-full flex flex-col gap-4 overflow-y-scroll">
            <div className="sm:text-3xl text-xl font-bold text-center capitalize h-full flex flex-col justify-center items-center">
              <p className="text-accent-color sm:text-6xl text-5xl font-bold">Whoops!</p>
              <p>Internal Server Error</p>
              <div className="absolute lg:text-[500px] md:text-[300px] sm:text-[230px] text-[200px] text-darktext text-opacity-50">
                505
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

