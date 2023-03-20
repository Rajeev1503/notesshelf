import Link from "next/link";
import { FaHome } from "react-icons/fa";
export default function MobileMenu(props) {

  return (
    <div className="sm:hidden fixed text-sm bottom-0 w-full mt-2 z-50">
      <div className="flex flex-row items-center justify-start gap-4 py-2 border-t border-gray-700 bg-app-background bg-opacity-80 backdrop-blur text-white">
        <Link
          href="/"
          className="w-[40px] flex justify-center items-center text-center font-semibold p-2 text-lighttext border-r border-gray-600 cursor-pointer"
        >
          <FaHome />
        </Link>

        <div className="w-full flex flex-row justify-between items-center pr-4">
          <div
            onClick={props.toggleMobileQuickMenu}
            className="w-[80px] rounded-3xl text-xs font-semibold border-2 p-2 px-4 border-gray-600 border-opacity-40 cursor-pointer"
          >
            <div>Subjects</div>
          </div>

          { props.enableAskQuestionButton?<div
              className="w-[120px] rounded-3xl text-xs font-semibold border-2 p-2 px-4 border-white border-opacity-40 cursor-pointer"
              onClick={props.askQuestionDisplay}
            >
              <div className="">
                Ask Questions
              </div>
            </div>:<></>}

          <Link
            href="/"
            className={` ${
              props.enableRelatedMenu
                ? "hidden"
                : "w-[80px] p-2 px-4 rounded-3xl text-xs font-semibold border border-transparent min-w-max"
            } `}
          >
            <div></div>
          </Link>
          
          <div
            className={`${
              props.enableRelatedMenu ? "" : "hidden"
            } w-[80px] rounded-3xl text-xs font-semibold border-2 p-2 px-4 border-gray-600 border-opacity-40 cursor-pointer`}
            onClick={props.toggleMobileRelatedMenu}
          >
            <div className="">Related</div>
          </div>
        </div>
      </div>

    </div>
  );
}
