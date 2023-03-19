import QuickMenu from "@/components/sections/quick-menu";
import TopMenu from "@/components/sections/top-menu";
import Head from "next/head";
import { useState } from "react";
import RelatedPosts from "@/components/sections/related-posts";
import MobileMenu from "@/components/sections/mobile-menu";
import AskQuestions from "@/components/sections/AskQuestions/askQuestions";

export default function Layout({
  title,
  semesters,
  relatedPost,
  enableShareButton,
  enableAskQuestionButton,
  enableRelatedMenu,
  allPosts,
  children,
}) {
  const [toggleMobileQuickMenu, setToggleMobileQuickMenu] = useState(true);
  const [toggleMobileRelatedMenu, setToggleMobileRelatedMenu] = useState(true);
  const [askQuestionDisplay, setAskQuestionDisplay] = useState(false);

  return (
    <>
      <Head>
        <title>{`${title}`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className="bg-app-background flex flex-col w-full text-lighttext pb-24 sm:pb-0"
        style={{ height: "100vh" }}
      >
        <div className="p-1 border-b border-border-dark border-opacity-20 shadow-md">
          <TopMenu
            enableShareButton={enableShareButton}
            enableAskQuestionButton={enableAskQuestionButton}
            askQuestionDisplay={() =>
              setAskQuestionDisplay(!askQuestionDisplay)
            }
          />
        </div>
        <div
          className="flex flex-row justify-between w-full h-full"
          style={{ height: "92.6vh" }}
        >
          <div
            className={`bg-app-background scrollbarfeature border-r border-border-dark border-opacity-20 shadow-md sm:w-1/3 lg:w-[18%] p-4 h-full overflow-y-scroll sm:block ${
              !toggleMobileQuickMenu ? "absolute z-40" : "hidden"
            } `}
          >
            <div className="flex w-full">
              <div className="w-5/6 sm:w-full">
                <QuickMenu
                  semesters={semesters}
                  toggleMobileQuickMenu={() => setToggleMobileQuickMenu(true)}
                />
              </div>
              <div
                className="w-1/6 sm:hidden"
                onClick={() => setToggleMobileQuickMenu(true)}
              ></div>
            </div>
          </div>

          <div className={`scrollbarfeature w-full h-full flex flex-col gap-4 overflow-y-scroll pb-0 ${relatedPost ?'sm:w-2/3 lg:w-[64%]' : 'sm:w-2/3 lg:w-[82%]'}`}>
            {children}
          </div>
          {relatedPost ? (
            <div
              className={`z-40 bg-app-background scrollbarfeature border-l border-border-dark border-opacity-20 shadow-md sm:w-1/3 lg:w-[18%] p-4 h-full overflow-y-scroll sm:block ${
                !toggleMobileRelatedMenu
                  ? "absolute right-0 w-[90%] px-8 z-2"
                  : "hidden"
              } `}
            >
              <RelatedPosts
                allPosts={allPosts}
                toggleMobileRelatedMenu={() => setToggleMobileRelatedMenu(true)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <MobileMenu
          toggleMobileQuickMenu={() => {
            setToggleMobileRelatedMenu(true);
            setToggleMobileQuickMenu(!toggleMobileQuickMenu);
          }}
          toggleMobileRelatedMenu={() => {
            setToggleMobileRelatedMenu(!toggleMobileRelatedMenu);
            setToggleMobileQuickMenu(true);
          }}
          askQuestionDisplay={() => setAskQuestionDisplay(!askQuestionDisplay)}
          enableRelatedMenu={enableRelatedMenu}
          enableAskQuestionButton={enableAskQuestionButton}
        />
        <div
          className={`${askQuestionDisplay ? "flex items-center" : "hidden"}`}
        >
          <AskQuestions
            askQuestionDisplay={() => setAskQuestionDisplay(false)}
          />
        </div>
      </div>
    </>
  );
}
