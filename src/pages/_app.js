import { BackgroundColorContext } from "@/context/backgroundColorContext";
import "@/styles/globals.css";
import { useReducer } from "react";

export default function App({ Component, pageProps }) {
  const DARK_MODE = {
    mode: "dark",
    app_background: "bg-[#0d1117]",
    card_background: "bg-[#0d1117] border border-[#21262d]",
    small_card_background: "bg-[#9caf88] bg-opacity-50",
    border_color: "border-[#21262d]",
    gray_background: "bg-[#161b22]",
    accent_background: "bg-[#fff]",
    accent_text_color: "text-[#fff]",
    accent_border_color: "border-[#fff]",
    main_text: "text-[#c9d1d9]",
    sub_text: "text-[#c9d1d9]",
    gray_text: "text-[#9da7b3]",
  };

  const LIGHT_MODE = {
    mode: "light",
    app_background: "bg-[#fff]",
    card_background: "bg-[#fff] border border-[#eee]",
    border_color: "border-[#DBDBDB]",
    gray_background: "bg-[#161b22]",
    accent_background: "bg-[#000]",
    accent_text_color: "text-[#000]",
    accent_border_color: "border-[#000]",
    main_text: "text-[#000]",
    sub_text: "text-[#3D4040]",
    gray_text: "text-[#999493]",
  };

  function backgroundColorReducer(backgroundColorState, action) {
    switch (action.type) {
      case "dark": {
        return DARK_MODE;
      }
      case "light": {
        return LIGHT_MODE;
      }
      default:
        return backgroundColorState;
    }
  }

  const [backgroundColorState, backgroundColorDispatch] = useReducer(
    backgroundColorReducer,
    DARK_MODE
  );

  return (
    <BackgroundColorContext.Provider
      value={{ backgroundColorState, backgroundColorDispatch }}
    >
      <Component {...pageProps} />
    </BackgroundColorContext.Provider>
  );
}
