import { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import WindowLayout from "../sections/windowLayout";

export default function Chat({ colorPalette, ...props }) {
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
  
  const [inputValue, setInputValue] = useState("");

  return (
    <WindowLayout
      colorPalette={colorPalette}
      toggleWindowClose={props.toggleChatDisplay}
      showTextSizeBar={false}
    >
      <div
        className={`w-full h-full flex flex-row items-center gap-2`}
      >
        <div className="md:w-1/3 md:block hidden h-full md:p-4 p-1 bg-[#111] bg-opacity-70">
          <div className={`text-xs h-full flex flex-col gap-4 px-2`}>
            <div className="h-[5%] flex flex-row gap-1">
              <input
                className={`outline-none flex-grow min-w-max rounded-lg bg-transparent px-2 border ${border_color}`}
                placeholder="Add Friend"
              />
              <button
                className={`w-full flex-grow max-w-min shadow-md ${card_background} py-1 px-4 rounded-lg cursor-pointer text-xs`}
                type="submit"
              >
                Add
              </button>
            </div>
          <div className="pt-2 h-[93%]">
            <div className="h-full scrollbarfeature overflow-y-scroll">
            <div className="flex flex-col gap-6 pt-4">
              <div className="flex flex-row items-center gap-2 font-semibold text-xs">
                <span className="text-3xl">
                  <RxAvatar />
                </span>
                <div className="flex-grow max-w-full flex flex-row justify-between items-center"><span>User 1</span><span className="text-[#555]">Yesterday</span></div>
              </div>
              <div className="flex flex-row items-center gap-2 font-semibold text-xs">
                <span className="text-3xl">
                  <RxAvatar />
                </span>
                <div className="flex-grow max-w-full flex flex-row justify-between items-center"><span>User 1</span><span className="text-[#555]">Yesterday</span></div>
              </div>
              <div className="flex flex-row items-center gap-2 font-semibold text-xs">
                <span className="text-3xl">
                  <RxAvatar />
                </span>
                <div className="flex-grow max-w-full flex flex-row justify-between items-center"><span>User 1</span><span className="text-[#555]">Yesterday</span></div>
              </div>
              <div className="flex flex-row items-center gap-2 font-semibold text-xs">
                <span className="text-3xl">
                  <RxAvatar />
                </span>
                <div className="flex-grow max-w-full flex flex-row justify-between items-center"><span>User 1</span><span className="text-[#555]">Yesterday</span></div>
              </div>
              <div className="flex flex-row items-center gap-2 font-semibold text-xs">
                <span className="text-3xl">
                  <RxAvatar />
                </span>
                <div className="flex-grow max-w-full flex flex-row justify-between items-center"><span>User 1</span><span className="text-[#555]">Yesterday</span></div>
              </div>
              <div className="flex flex-row items-center gap-2 font-semibold text-xs">
                <span className="text-3xl">
                  <RxAvatar />
                </span>
                <div className="flex-grow max-w-full flex flex-row justify-between items-center"><span>User 1</span><span className="text-[#555]">Yesterday</span></div>
              </div>
              <div className="flex flex-row items-center gap-2 font-semibold text-xs">
                <span className="text-3xl">
                  <RxAvatar />
                </span>
                <div className="flex-grow max-w-full flex flex-row justify-between items-center"><span>User 1</span><span className="text-[#555]">Yesterday</span></div>
              </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="md:w-2/3 w-full  h-full flex flex-col md:pt-4 pt-2">
          <div className="h-[8%]">User 1</div>
          <div className="h-[77%] overflow-y-scroll scrollbarfeature w-full rounded-lg md:p-4 p-1">
            <div className={`flex flex-col gap-2 py-4 px-2`}>earlier chats</div>
          </div>
          <form
            className={`h-[6%] w-[80%] flex m-auto justify-between gap-2 bg-transparent border ${border_color} rounded-lg px-2 py-1`}
            onSubmit={(e) => {
              e.preventDefault();
              setInputValue("");
            }}
          >
            <input
              type="text"
              placeholder="Type your Question, press enter or click on send button"
              className="w-full bg-transparent outline-none"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <button
              type="submit"
              className={`${card_background} rounded-lg px-4 py-1`}
            >
              <TbSend />
            </button>
          </form>
        </div>
      </div>
    </WindowLayout>
  );
}
