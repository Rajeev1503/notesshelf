import { useState } from "react";
import { MdClose, MdMinimize, MdMaximize } from "react-icons/md";

export default function WindowLayout({ colorPalette,sliderValue,setSliderValue,toggleWindowClose, ...props }) {
  const [maximiseWindow, setMaximiseWindow] = useState(false);
  
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
      className={`z-10 h-[87.2vh] md:h-[92vh] md:border ${card_background} ${app_background} bg-opacity-90 backdrop-blur-3xl shadow-md flex flex-col items-center absolute top-[55px] rounded-lg w-[98%] ${
        maximiseWindow ? " md:left-2 md:w-[99%]" : " md:left-[25%] left-1 md:w-[60%]"
      }`}
    >
      <div
        className={`h-[6%] flex md:justify-between justify-between items-center gap-2 text-xs font-semibold w-full px-2 py-2 border-b ${border_color}`}
      >
        <div className="md:w-1/3 max-w-max">
        <div
          className={`${card_background} p-1 px-4 rounded-lg cursor-pointer min-w-max flex items-center justify-between gap-2`}
        >
          <span className="max-w-max">Text Size</span>
          <div className="max-w-full flex items-center">
            <button
              className="disabled:cursor-not-allowed px-2 rounded-full font-bold"
              disabled={sliderValue < 15}
              onClick={() => setSliderValue((prevValue) => prevValue - 1)}
            >
              -
            </button>
            <input
              type="range"
              min="14"
              max="25"
              className="slider w-24"
              value={sliderValue}
              onChange={(e) => setSliderValue(e.target.value)}
            />
            <button
              className="disabled:cursor-not-allowed px-2 rounded-full font-bold"
              disabled={sliderValue > 24}
              onClick={() => setSliderValue((prevValue) => prevValue + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

        {/* buttons */}
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
            onClick={toggleWindowClose}
          >
            <MdClose />
          </div>
        </div>
      </div>
      <div className={`h-[94%] ${maximiseWindow?'w-[60%]':'w-full' }`}>{props.children}</div>
    </div>
  );
}
