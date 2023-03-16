import Head from "next/head";
import QuickMenu from "@/components/sections/quick-menu";
import TopMenu from "@/components/sections/top-menu";
import Hero from "@/components/sections/hero";
import { GET_ALL_LATEST_POST, GET_ALL_SEMESTER } from "graphql/queries";
import { useState } from "react";
import LatestPosts from "@/components/sections/latest-posts";
import { graphcms } from "graphql/graphCmsClient";
import MobileMenu from "@/components/sections/mobile-menu";

export default function Home({ posts, semesters }) {
  const [toggleMobileQuickMenu, setToggleMobileQuickMenu] = useState(true);

  return (
    <>
      <Head>
        <title>NotesShelf</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className="bg-[#13131e] flex flex-col w-full text-[#e5e5e5]"
        style={{ height: "100vh" }}
      >
        <div className="p-2 border-b border-[#1a1a2e]">
          <TopMenu enableShareButton={false} />
        </div>
        <div
          className="flex sm:flex-row flex-col w-full h-full md:pb-0"
          style={{ height: "92.5vh" }}
        >
          <div
            className={`bg-[#13131e] scrollbarfeature border-r border-[#1a1a2e] sm:w-1/3 lg:w-[18%] p-4 h-full overflow-y-scroll sm:block w-full sm:relative ${
              !toggleMobileQuickMenu ? "absolute z-2" : "hidden"
            }`}
          >
            <div className="flex w-full">
              <div className="w-5/6 sm:w-full">
                <QuickMenu
                  semesters={semesters}
                  toggleMobileQuickMenu={() => setToggleMobileQuickMenu(true)}
                />
              </div>
              <div
                className="w-1/6 md:hidden bg-transparent"
                onClick={() => setToggleMobileQuickMenu(true)}
              ></div>
            </div>
          </div>
          <div className="scrollbarfeature sm:w-2/3 lg:w-[82%] w-full h-full flex flex-col gap-4 overflow-y-scroll pb-0">
            <div className="">
              <Hero />
            </div>
            <div className="mb-8">
              <LatestPosts posts={posts} semesters={semesters} />
            </div>
          </div>
        </div>
        <MobileMenu
          toggleMobileQuickMenu={() =>
            setToggleMobileQuickMenu(!toggleMobileQuickMenu)
          }
          enableRelatedMenu={false}
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const { posts } = await graphcms.request(GET_ALL_LATEST_POST, {
      isLatest: true,
    });
    const { semesters } = await graphcms.request(GET_ALL_SEMESTER);

    if (!posts || !semesters) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        posts: posts,
        semesters: semesters,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
