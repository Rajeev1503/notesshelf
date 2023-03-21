import { BackgroundColorContext } from "@/context/backgroundColorContext";
import "@/styles/globals.css";
import { useReducer } from "react";

export default function App({ Component, pageProps }) {
  function backgroundColorReducer(backgroundColorState, action) {
    switch (action.type) {
      case "dark": {
        return {
          mode : "dark",
          app_background: "bg-[#000]",
          card_background: "bg-[#000807] border border-[#222]",
          small_card_background: "bg-[#9caf88] bg-opacity-50",
          border_color: "border-[#202020]",
          gray_background: "bg-[#374151]",
          accent_background: "bg-[#9caf88]",
          accent_text_color: "text-[#9caf88]",
          accent_border_color:"border-[#9caf88]",
          main_text: "text-[#E8E8E8]",
          sub_text: "text-[#fff]",
          gray_text: "text-[#888]"
        };
      }
      case "light": {
        return {
          mode: "light",
          app_background: "bg-[#f3efea]",
          card_background: "bg-[#caccce]",
          border_color: "border-[#DBDBDB]",
          gray_background: "bg-[#374151]",
          accent_background: "bg-[#9caf88]",
          accent_text_color: "text-[#9caf88]",
          accent_border_color:"border-[#9caf88]",
          main_text: "text-[#000]",
          sub_text: "text-[#3D4040]",
          gray_text: "text-[#999493]",
        };
      }
      default:
        return backgroundColorState;
    }
  }

  const [backgroundColorState, backgroundColorDispatch] = useReducer(
    backgroundColorReducer,
    
    {
          mode : "dark",
          app_background: "bg-[#23293d]",
          card_background: "bg-[#303855]",
          small_card_background: "bg-[#abb8da]",
          border_color: "border-[#374151]",
          gray_background: "bg-[#374151]",
          accent_background: "bg-[#896bff]",
          accent_text_color: "text-[#896bff]",
          accent_border_color:"border-[#896bff]",
          main_text: "text-[#E8E8E8]",
          sub_text: "text-[#CCCCCC]",
          gray_text: "text-[#BCC8FA]"
    }
  );

  return (
    <BackgroundColorContext.Provider
      value={{ backgroundColorState, backgroundColorDispatch }}
    >
      <Component {...pageProps} />
    </BackgroundColorContext.Provider>
  );
}
