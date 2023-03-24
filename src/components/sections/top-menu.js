import { BackgroundColorContext } from "@/context/backgroundColorContext";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import logo from "../../../public/icons/icon-512x512.png";

export default function TopMenu({ colorPalette, toggleAllMenus, ...props }) {
  const [clipBoardVariable, setClipBoardVariable] = useState(false);
  const { subjectId, postId } = useRouter().query;

  function clipBoardCopiedHandler() {
    if (clipBoardVariable) {
      return <span>Link Copied!!!</span>;
    }
    return (
      <div className="flex items-center justify-center gap-1">
        <span>Share</span>
        <span>
          <FaShareAlt />
        </span>
      </div>
    );
  }

  function subjectNameShortner(subjectName) {
    const subjectNameArr = subjectName.split("-");
    let subjectNameShortened;
    if (subjectNameArr.length > 6) {
      subjectNameArr.splice(4, subjectNameArr.length - 4, "...");
    }
    subjectNameShortened = subjectNameArr.join(" ");
    return subjectNameShortened;
  }

  const backgroundColorContext = useContext(BackgroundColorContext);

  const {
    current_mode,
    card_background,
    accent_text_color,
    accent_border_color,
    main_text,
  } = colorPalette;

  return (
    <div
      className={`flex flex-row justify-between font-semibold items-center p-2 ${main_text}`}
    >
      <div className="sm:w-1/4 max-w-max font-bold py-1">
        <Link
          className="max-w-max flex justify-start items-center gap-1"
          href="/"
        >
          <Image src={logo} alt="logo" height={20} width={20} />
        </Link>
      </div>

      <div
        className={`sm:w-1/2 px-2 flex md:justify-center justify-center items-center gap-2 capitalize text-sm font-semibold ${
          props?.enableShareButton ? "" : "hidden"
        }`}
      >
        {props?.enableShareButton ? (
          <div className="">
            <Link
              href={`/${subjectId}`}
              className="md:hidden min-w-full flex justify-center"
            >
              {subjectNameShortner(subjectId)}
            </Link>
            <Link href={`/${subjectId}`} className="hidden md:block">
              {subjectId.split("-").join(" ")}
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="sm:w-1/4 max-w-max md:w-full flex flex-row gap-2 justify-center">
        {props.enableShareButton ? (
          <div className="flex justify-end gap-2 items-center ">
            <div
              className="flex-grow max-w-min"
              onClick={() => {
                navigator.clipboard.writeText(
                  process.env.NODE_ENV == "production"
                    ? `notesshelf.vercel.app/${subjectId}/${
                        postId ? postId : ""
                      }`
                    : `http://localhost:3000/${subjectId}/${
                        postId ? postId : ""
                      }`
                );
                setClipBoardVariable(true);
              }}
            >
              <div
                className={`${card_background} min-w-max py-1 px-2 rounded-lg cursor-pointer text-xs`}
              >
                {clipBoardCopiedHandler()}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="md:block hidden">
          {props.enableAskQuestionButton ? (
            <div
              className="w-full hidden md:inline"
              onClick={() => {
                toggleAllMenus.toggleChatDisplay(false);
                toggleAllMenus.askQuestionDisplay(true);
              }}
            >
              <button
                className={`w-full min-w-max shadow-md ${card_background} py-1 px-4 rounded-lg cursor-pointer text-xs`}
              >
                Ask Questions
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="md:block hidden">
          <div
            className="w-full hidden md:inline"
            onClick={() => {
              toggleAllMenus.toggleChatDisplay(true);
              toggleAllMenus.askQuestionDisplay(false);
            }}
          >
            <button
              className={`w-full min-w-max shadow-md ${card_background} py-1 px-4 rounded-lg cursor-pointer text-xs`}
            >
              Group Study
            </button>
          </div>
        </div>
        <div className="md:block hidden">
          <div
            className="w-full hidden md:inline"
            onClick={() => {
              toggleAllMenus.toggleChatDisplay(false);
              toggleAllMenus.askQuestionDisplay(true);
            }}
          >
            <button
              className={`w-full min-w-max shadow-md ${card_background} py-1 px-4 rounded-lg cursor-pointer text-xs`}
            >
              My Bookmarks
            </button>
          </div>
        </div>
        <div className="md:block hidden">
          <div
            className="w-full hidden md:inline"
            onClick={() => {
              toggleAllMenus.toggleChatDisplay(false);
              toggleAllMenus.askQuestionDisplay(true);
            }}
          >
            <button
              className={`w-full min-w-max shadow-md ${card_background} py-1 px-4 rounded-lg cursor-pointer text-xs`}
            >
              Forum
            </button>
          </div>
        </div>
        <div>
          <div
            className="w-full hidden md:inline"
            onClick={() => {
              toggleAllMenus.toggleChatDisplay(false);
              toggleAllMenus.askQuestionDisplay(true);
            }}
          >
            <button
              className={`w-full min-w-max shadow-md ${card_background} py-1 px-4 rounded-lg cursor-pointer text-xs`}
            >
              Log Out
            </button>
          </div>
        </div>
        <div
          className={`${card_background} min-w-max py-1 px-2 rounded-lg cursor-pointer text-xs flex items-center`}
          onClick={() => {
            if (current_mode === "dark") {
              backgroundColorContext.backgroundColorDispatch({ type: "light" });
            } else
              backgroundColorContext.backgroundColorDispatch({ type: "dark" });
          }}
        >
          <p>
            {current_mode === "dark" ? (
              <span>
                <MdDarkMode />
              </span>
            ) : (
              <span>
                <MdOutlineDarkMode />
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
