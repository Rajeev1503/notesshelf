import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaShare } from "react-icons/fa";
import logo from "../../../public/icons/icon-512x512.png";
import AskQuestions from "./AskQuestions/askQuestions";

export default function TopMenu(props) {
  const [clipBoardVariable, setClipBoardVariable] = useState(false);

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
    let subjectNameArr = subjectName.split("-");
    if (subjectNameArr.length > 4) {
      subjectNameArr.splice(4, subjectNameArr.length - 4, "...");
    }
    return subjectNameArr.join(" ");
  }

  const [askQuestionDisplay, setAskQuestionDisplay] = useState(false);

  const { subjectId, postId } = useRouter().query;

  return (
    <div className="flex flex-row justify-between items-center px-2">
      <div className="w-[18%] font-bold py-1">
        <Link
          className="max-w-min flex justify-start items-center gap-1"
          href="/"
        >
          <Image src={logo} alt="logo" height={20} width={20} />
          <span className="md:inline text-xs md:text-normal text-[#896bff] text-opacity-70 ">
            NotesShelf
          </span>
        </Link>
      </div>

      <div
        className={`w-[40%] px-2 hidden md:flex justify-start capitalize text-sm font-semibold py-1 ${
          props?.enableShareButton ? "" : "hidden"
        }`}
      >
        {props?.enableShareButton ? (
          <div>
            <Link href={`/${subjectId}`} className="sm:hidden">
              {subjectNameShortner(subjectId)}
            </Link>
            <Link href={`/${subjectId}`} className="hidden sm:block">
              {subjectId.split("-").join(" ")}
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="w-[24%] py-1">
        {props.enableShareButton ? (
          <div className="w-full flex justify-end gap-2 items-center ">
            <div
              className="w-full"
              onClick={() => setAskQuestionDisplay(!askQuestionDisplay)}
            >
              <button className="w-full border min-w-max border-white text-white py-1 px-2 rounded-lg cursor-pointer text-xs">
                Ask Questions
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="w-[18%] py-1">
        {props.enableShareButton ? (
          <div className="flex justify-end gap-2 items-center ">
            <div
              className="flex-grow max-w-min"
              onClick={() => {
                navigator.clipboard.writeText(
                  process.env.NODE_ENV == "production"
                    ? `${process.env.PRODUCTION_URL}/${subjectId}/${
                        postId ? postId : ""
                      }`
                    : `http://localhost:3000/${subjectId}/${
                        postId ? postId : ""
                      }`
                );
                setClipBoardVariable(true);
              }}
            >
              <div className="border border-[#896bff] text-[#896bff] min-w-max py-1 px-2 rounded-lg cursor-pointer text-xs">
                {clipBoardCopiedHandler()}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={`${askQuestionDisplay ? "flex items-center" : "hidden"}`}>
        <AskQuestions />
      </div>
    </div>
  );
}
