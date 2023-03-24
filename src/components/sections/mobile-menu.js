import { BackgroundColorContext } from "@/context/backgroundColorContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

export default function MobileMenu({ colorPalette, showDockState, ...props }) {
  const backgroundColorContext = useContext(BackgroundColorContext);
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
    <div
      className={`${
        showDockState
          ? "absolute bottom-2 left-[35%] z-50"
          : "absolute bottom-0 left-[35%] -z-50"
      }  max-w-min h-auto text-sm transition-all`}
    >
      <div
        className={`flex flex-row items-center justify-start gap-4 rounded-lg py-2 px-14 ${main_text} bg-[#222] bg-opacity-80 backdrop-blur-xl `}
      >
        <div className="w-full flex flex-row justify-center gap-2 items-center">
          <div
            onClick={props.toggleMobileQuickMenu}
            className={`w-[80px] rounded-3xl text-xs font-semibold p-2 px-4 ${main_text} ${card_background} ${app_background} cursor-pointer`}
          >
            <div className="text-center">Subjects</div>
          </div>
          {props.enableAskQuestionButton ? (
            <div
              className={`w-max rounded-3xl text-xs font-semibold p-2 px-4 ${main_text} ${card_background} ${app_background} cursor-pointer`}
              onClick={props.askQuestionDisplay}
            >
              <div className="text-center">Ask Questions To AI</div>
            </div>
          ) : (
            <></>
          )}
          <div
            href="/"
            className={`w-max rounded-3xl text-xs font-semibold p-2 px-4 ${main_text} ${card_background} ${app_background} cursor-pointer`}
            onClick={props.toggleChatDisplay}
          >
            <div>Chat</div>
          </div>
          <div
            href="/"
            className={`w-max rounded-3xl text-xs font-semibold p-2 px-4 ${main_text} ${card_background} ${app_background} cursor-pointer ${
              props.enableRelatedMenu ? "hidden" : ""
            } `}
          >
            <div>My Bookmarks</div>
          </div>
          <div
            className={`${
              props.enableRelatedMenu ? "" : "hidden"
            } w-[80px] rounded-3xl text-xs font-semibold p-2 px-4 ${main_text} ${card_background} ${app_background} cursor-pointer`}
            onClick={props.toggleMobileRelatedMenu}
          >
            <div className="text-center">Related</div>
          </div>
          |
          <div
            className={`border ${accent_border_color} min-w-max py-1 px-2 rounded-lg cursor-pointer text-xs ${accent_text_color}`}
            onClick={() => {
              if (current_mode === "dark") {
                backgroundColorContext.backgroundColorDispatch({
                  type: "light",
                });
              } else
                backgroundColorContext.backgroundColorDispatch({
                  type: "dark",
                });
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
    </div>
  );
}
