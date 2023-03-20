import { BackgroundColorContext } from "@/context/backgroundColorContext";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaShare } from "react-icons/fa";
import logo from "../../../public/icons/icon-512x512.png";

export default function TopMenu({ colorPalette, ...props }) {
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
          <FaShare />
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
      className={`flex flex-row justify-between items-center p-2 ${main_text}`}
    >
      <div className="sm:w-1/4 max-w-max font-bold py-1">
        <Link
          className="max-w-max flex justify-start items-center gap-1"
          href="/"
        >
          <Image src={logo} alt="logo" height={20} width={20} />
          <p
            className={`hidden md:inline-block text-xs md:text-normal ${accent_text_color}`}
          >
            NotesShelf
          </p>
        </Link>
      </div>

      <div
        className={`sm:w-1/2 max-w-max px-2 flex justify-evenly items-center gap-2 capitalize text-sm font-semibold border-x border-border-dark ${
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
            <Link href={`/${subjectId}`} className="hidden sm:block">
              {subjectId.split("-").join(" ")}
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="md:block hidden">
          {props.enableAskQuestionButton ? (
            <div
              className="w-full hidden md:inline"
              onClick={props.askQuestionDisplay}
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
      </div>

      <div className="sm:w-1/4 max-w-max md:w-full flex flex-row gap-2 justify-center">
        <div
          className={`border ${accent_border_color} min-w-max py-1 px-2 rounded-lg cursor-pointer text-xs ${accent_text_color}`}
          onClick={() => {
            if (current_mode === "dark") {
              backgroundColorContext.backgroundColorDispatch({ type: "light" });
            }
            else backgroundColorContext.backgroundColorDispatch({type: "dark"})
          }}
        >
          <p>Dark Mode : {(current_mode==='dark')?<span>ON</span>:<span>OFF</span>}</p>
        </div>
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
                className={`border ${accent_border_color} min-w-max py-1 px-2 rounded-lg cursor-pointer text-xs ${accent_text_color}`}
              >
                {clipBoardCopiedHandler()}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
