import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaShare } from "react-icons/fa";
import logo from "../../../public/icons/icon-512x512.png";

export default function TopMenu(props) {
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
      const subjectNameArr = subjectName.split('-');
      let subjectNameShortened;
      if(subjectNameArr.length>6){
       subjectNameArr.splice(4,subjectNameArr.length-4, '...')
      }
      subjectNameShortened = subjectNameArr.join(' ')
      return subjectNameShortened
  }


  return (
    <div className="flex flex-row justify-between items-center p-2">
      <div className="md:w-[18%] w-1/4 font-bold py-1">
        <Link
          className="max-w-min flex justify-start items-center gap-1"
          href="/"
        >
          <Image src={logo} alt="logo" height={20} width={20} />
          <span className="md:inline text-xs md:text-normal text-accent-color text-opacity-70 ">
            NotesShelf
          </span>
        </Link>
      </div>

      <div
        className={`md:w-[40%] w-1/2 px-2 flex md:justify-start justify-center capitalize text-sm font-semibold ${
          props?.enableShareButton ? "" : "hidden"
        }`}
      >
        {props?.enableShareButton ? (
          <div className="w-full">
            <Link href={`/${subjectId}`} className="md:hidden min-w-full flex justify-center">
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

      <div className="w-[24%] md:block hidden">
        {props.enableAskQuestionButton ? (
          <div className="w-full flex justify-end gap-2 items-center ">
            <div
              className="w-full hidden md:inline"
              onClick={props.askQuestionDisplay}
            >
              <button className="w-full min-w-max border-2 border-border-dark border-opacity-30 shadow-md bg-opacity-50 backdrop-filter bg-card-dark py-1 px-2 rounded-lg cursor-pointer text-xs">
                Ask Questions
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="md:w-[18%] w-1/4">
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
              <div className="border border-accent-color text-accent-color min-w-max py-1 px-2 rounded-lg cursor-pointer text-xs">
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
