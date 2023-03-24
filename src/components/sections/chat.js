import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";
import { MdClose, MdMinimize, MdMaximize } from "react-icons/md";

export default function Chat({ colorPalette, ...props }) {
  const {
    app_background,
    card_background,
    border_color
  } = colorPalette;

  const [maximiseWindow, setMaximiseWindow] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      className={`z-0 h-[87.2vh] md:h-[85vh] md:border ${card_background} ${app_background} shadow-md flex flex-col items-center absolute top-[45px] rounded-lg w-[98%] ${
        maximiseWindow ? " md:left-2 md:w-[99%]" : " md:left-[25%] md:w-[60%]"
      }`}
    >
      <div
        className={`flex md:justify-between justify-between items-center gap-2 text-xs font-semibold w-full px-2 py-2 border-b ${border_color}`}
      >
        <div>
          Chat
        </div>
        <div className="px-4 w-1/3 p-1 hidden md:flex flex-row justify-end gap-2 text-xs">
          {!maximiseWindow ? (
            <div
              className={`${card_background} p-1 rounded-full cursor-pointer`}
              onClick={() => setMaximiseWindow(true)}
            >
              <MdMaximize />
            </div>
          ) : (
            <div
              className={`${card_background} p-1 rounded-full cursor-pointer`}
              onClick={() => setMaximiseWindow(false)}
            >
              <MdMinimize />
            </div>
          )}

          <div
            className={`${card_background} p-1 rounded-full cursor-pointer`}
            onClick={props.askQuestionDisplay}
          >
            <MdClose />
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-row items-center gap-2 overflow-y-scroll">
        <div className="w-1/4 h-full overflow-y-scroll scrollbarfeature md:p-4 p-1 border-r border-white border-opacity-20">
          <div
            className={`flex flex-col gap-2 py-4 px-2 ${
              maximiseWindow ? "md:w-[60%] m-auto" : ""
            }`}
          >
            friends online
          </div>
        </div>

        <div className="w-3/4 h-[100%] flex flex-col md:pt-4 pt-2">
        <div className="h-[86%] overflow-y-scroll scrollbarfeature w-full rounded-lg md:p-4 p-1">
          <div
            className={`flex flex-col gap-2 py-4 px-2 ${
              maximiseWindow ? "md:w-[60%] m-auto" : ""
            }`}
          >
            earlier chats
          </div>
        </div>
          <form
            className={`h-[10%] m-auto flex justify-center gap-2 bg-transparent border ${border_color} rounded-lg px-2 py-1 ${
              maximiseWindow ? "md:w-[60%] m-auto" : "w-[90%]"
            }`}
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
    </div>
  );
}
