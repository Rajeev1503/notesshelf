import QuickMenu from "@/components/sections/quick-menu";
import TopMenu from "@/components/sections/top-menu";
import Head from "next/head";
import { useContext, useState } from "react";
import RelatedPosts from "@/components/sections/related-posts";
import MobileMenu from "@/components/sections/mobile-menu";
import AskQuestions from "@/components/windows/askQuestions";
import { BackgroundColorContext } from "@/context/backgroundColorContext";
import OnGoingExams from "@/components/onGoingExams";
import Chat from "@/components/windows/chat";
import SavedPost from "@/components/windows/savedPosts";
import { useRouter } from "next/router";

export default function Layout({
  title,
  semesters,
  relatedPost,
  enableShareButton,
  enableAskQuestionButton,
  enableRelatedMenu,
  allPosts,
  children,
  excerpt,
  coverImage
}) {
  const [toggleMobileQuickMenu, setToggleMobileQuickMenu] = useState(true);
  const [toggleMobileRelatedMenu, setToggleMobileRelatedMenu] = useState(true);
  const [askQuestionDisplay, setAskQuestionDisplay] = useState(false);
  const [toggleChatDisplay, setToggleChatDisplay] = useState(false);
  const [savedPostDisplay, setSavedPostDisplay] = useState(false);

  const backgroundColorContext = useContext(BackgroundColorContext);

  const { subjectId, postId } = useRouter().query;

  const colorPalette = {
    current_mode: backgroundColorContext.backgroundColorState.mode,
    app_background: backgroundColorContext.backgroundColorState.app_background,
    card_background:
      backgroundColorContext.backgroundColorState.card_background,
    small_card_background:
      backgroundColorContext.backgroundColorState.small_card_background,
    border_color: backgroundColorContext.backgroundColorState.border_color,
    gray_background:
      backgroundColorContext.backgroundColorState.gray_background,
    accent_background:
      backgroundColorContext.backgroundColorState.accent_background,
    accent_background_opacity:
      backgroundColorContext.backgroundColorState.accent_background_opacity,
    accent_text_color:
      backgroundColorContext.backgroundColorState.accent_text_color,
    accent_text_color_opacity:
      backgroundColorContext.backgroundColorState.accent_text_color_opacity,
    accent_border_color:
      backgroundColorContext.backgroundColorState.accent_border_color,
    accent_border_color_opacity:
      backgroundColorContext.backgroundColorState.accent_border_color_opacity,
    main_text: backgroundColorContext.backgroundColorState.main_text,
    sub_text: backgroundColorContext.backgroundColorState.sub_text,
    gray_text: backgroundColorContext.backgroundColorState.gray_text,
  };

  const {
    current_mode,
    app_background,
    card_background,
    small_card_background,
    border_color,
    gray_background,
    accent_background,
    accent_text_color,
    accent_border_color,
    main_text,
    sub_text,
    gray_text,
  } = colorPalette;

  function generateUrl() {
    let url;
    if (process.env.NODE_ENV == "production") {
      url = process.env.PRODUCTION_URL==undefined?'https://notesshelfmain.vercel.app':process.env.PRODUCTION_URL;
      if (subjectId) {
        url = url + subjectId;
        if (postId) {
          url = url + subjectId + "/" + postId;
        }
      }
    } else {
      url = "http://localhost:3000/";
      if (subjectId) {
        url = url + subjectId;
        if (postId) {
          url = url + subjectId + "/" + postId;
        }
      }
    }
    return url;
  }

  return (
    <>
      <Head>
        <title>{`${title}`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content={generateUrl()} />
        <meta property="og:type" content="NotesShelf - For University Exams" />
        <meta property="og:title" content={`${title}`} />
        {/* <meta name="twitter:card" content="summary" /> */}
        <meta
          property="og:description"
          content={excerpt?excerpt:title}
        />
        <meta property="og:image" content={coverImage?coverImage:'/public/icons/icon-512x512.png'} />
      </Head>
      <div
        className={`${app_background} flex flex-col w-full ${main_text} pb-24 sm:pb-0`}
        style={{ height: "100vh" }}
      >
        <div className={`p-1 border-b ${border_color} border-opacity-50`}>
          <TopMenu
          generateUrl={generateUrl()}
            colorPalette={colorPalette}
            enableShareButton={enableShareButton}
            enableAskQuestionButton={enableAskQuestionButton}
            toggleAllMenus={{
              toggleChatDisplay: (value) =>
                setToggleChatDisplay(toggleChatDisplay ? false : value),
              askQuestionDisplay: (value) =>
                setAskQuestionDisplay(askQuestionDisplay ? false : value),
              savedPostDisplay: (value) =>
                setSavedPostDisplay(savedPostDisplay ? false : value),
            }}
          />
        </div>
        <div
          className="flex flex-row justify-between w-full h-full"
          style={{ height: "92.6vh" }}
        >
          <div
            className={`border-r ${border_color} border-opacity-50 sm:w-1/3 lg:w-1/3 xl:w-[18%] h-full sm:block ${
              !toggleMobileQuickMenu ? "absolute z-40 md:z-0 w-full" : "hidden"
            } `}
          >
            <div className="flex w-full h-full">
              <div
                className={`${app_background} ${border_color} h-full w-[90%] sm:w-full scrollbarfeature overflow-y-scroll p-4 border-r border-opacity-20 md:border-none`}
              >
                <QuickMenu
                  colorPalette={colorPalette}
                  semesters={semesters}
                  toggleAllMenus={() => {
                    setToggleMobileQuickMenu(true);
                    setToggleMobileRelatedMenu(true);
                    setAskQuestionDisplay(false);
                  }}
                />
              </div>
              <div
                className="w-1/6 sm:hidden p-4"
                onClick={() => setToggleMobileQuickMenu(true)}
              ></div>
            </div>
          </div>

          <div
            className={`scrollbarfeature w-full h-full flex flex-col gap-4 overflow-y-scroll pb-0 ${
              relatedPost ? "sm:w-2/3 lg:w-[64%]" : "sm:w-2/3 lg:w-[82%]"
            }`}
          >
            <div>{children}</div>
          </div>
          {relatedPost ? (
            <div
              className={`z-40 md:z-0 md:border-l ${border_color} border-opacity-50 sm:w-1/3 lg:w-1/3 xl:w-[18%] h-full sm:block ${
                !toggleMobileRelatedMenu
                  ? "absolute right-0 w-full z-2"
                  : "hidden"
              } `}
            >
              <div className="flex w-full h-full">
                <div
                  className="w-1/6 sm:hidden p-4"
                  onClick={() => setToggleMobileRelatedMenu(true)}
                ></div>
                <div
                  className={`${app_background} ${border_color} h-full w-[90%] sm:w-full scrollbarfeature overflow-y-scroll p-4 border-l border-opacity-20 md:border-none`}
                >
                  <RelatedPosts
                    colorPalette={colorPalette}
                    allPosts={allPosts}
                    toggleAllMenus={() => {
                      setToggleMobileQuickMenu(true);
                      setToggleMobileRelatedMenu(true);
                      setAskQuestionDisplay(false);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <MobileMenu
          colorPalette={colorPalette}
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
            colorPalette={colorPalette}
            askQuestionDisplay={() => setAskQuestionDisplay(false)}
            toggleAllMenus={() => {
              setToggleChatDisplay(false);
            }}
          />
        </div>
        <div
          className={`${toggleChatDisplay ? "flex items-center" : "hidden"}`}
        >
          <Chat
            colorPalette={colorPalette}
            toggleChatDisplay={() => setToggleChatDisplay(false)}
            toggleAllMenus={() => {
              setAskQuestionDisplay(false);
            }}
          />
        </div>
        <div className={`${savedPostDisplay ? "flex items-center" : "hidden"}`}>
          <SavedPost
            colorPalette={colorPalette}
            savedPostDisplay={() => setSavedPostDisplay(false)}
            toggleAllMenus={() => {
              setAskQuestionDisplay(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
