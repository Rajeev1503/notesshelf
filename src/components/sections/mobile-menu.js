import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function MobileMenu({colorPalette, ...props}) {

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

  return (
    <div className="sm:hidden fixed text-sm bottom-0 w-full mt-2 z-50">
      <div className={`flex flex-row items-center justify-start gap-4 py-2 border-t bg-opacity-80 backdrop-blur ${main_text, border_color, app_background}`}>
        <Link
          href="/"
          className={`w-[40px] flex justify-center items-center text-center font-semibold p-2 border-r ${main_text, border_color, app_background} cursor-pointer`}
        >
          <FaHome />
        </Link>

        <div className="w-full flex flex-row justify-between items-center pr-4">
          <div
            onClick={props.toggleMobileQuickMenu}
            className={`w-[80px] rounded-3xl text-xs font-semibold p-2 px-4 ${main_text} ${card_background} ${app_background} cursor-pointer`}
          >
            <div className="text-center">Subjects</div>
          </div>

          { props.enableAskQuestionButton?<div
              className={`w-[120px] rounded-3xl text-xs font-semibold p-2 px-4 ${main_text} ${card_background} ${app_background} cursor-pointer`}
              onClick={props.askQuestionDisplay}
            >
              <div className="text-center">
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
            } w-[80px] rounded-3xl text-xs font-semibold p-2 px-4 ${main_text} ${card_background} ${app_background} cursor-pointer`}
            onClick={props.toggleMobileRelatedMenu}
          >
            <div className="text-center">Related</div>
          </div>
        </div>
      </div>

    </div>
  );
}
