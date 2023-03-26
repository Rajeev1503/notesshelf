import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GET_ALL_SEMESTER } from "graphql/queries";
import { useContext, useState } from "react";
import { graphcms, graphCmsReadOnly } from "graphql/graphCmsClient";
import Layout from "@/layout/layout";
import { BackgroundColorContext } from "@/context/backgroundColorContext";
import logo from "../../public/icons/icon-512x512.png";

export default function PageNotFound({ semesters }) {
  const backgroundColorContext = useContext(BackgroundColorContext);
  if (!semesters) {
    return (
      <>
        <Head>
          <title>NotesShelf</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div
          className="bg-app-background flex flex-col w-full text-lighttext"
          style={{ height: "100vh" }}
        >
          <div className="p-2 border-b border-border-dark">
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
              p
            </div>
          </div>
          <div
            className="flex sm:flex-row flex-col w-full h-full"
            style={{ height: "90vh" }}
          >
            <div className="scrollbarfeature sm:w-2/3 lg:w-5/6 w-full h-full flex flex-col gap-4 overflow-y-scroll">
              <div className="text-lg font-semibold text-center capitalize h-full flex flex-col justify-center items-center">
                <p>The Page your are looking for is not available</p>
                <div className="text-[500px] text-darktext text-opacity-40">
                  404
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <Layout
      title="404 Page - NotesShelf"
      semesters={semesters}
      relatedPost={false}
      enableShareButton={false}
      enableAskQuestionButton={false}
    >
      <div className="scrollbarfeature sm:w-2/3 lg:w-5/6 w-full h-full flex flex-col gap-4 overflow-y-scroll">
        <div className="sm:text-3xl text-xl font-bold text-center capitalize h-full flex flex-col justify-center items-center">
          <p className="text-[#896bff] sm:text-6xl text-5xl font-bold">
            Whoops!
          </p>
          <p>The Page your are looking for is not available</p>
          <div className="absolute lg:text-[500px] md:text-[300px] sm:text-[230px] text-[200px] text-[#1a1a1e] text-opacity-50">
            404
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { semesters } = await graphCmsReadOnly.request(GET_ALL_SEMESTER);

  if (!semesters) {
    return {
      props: {
        semesters: null,
      },
    };
  }

  return {
    props: {
      semesters: semesters,
    },
    revalidate: 10,
  };
}
