import { BackgroundColorContext } from "@/context/backgroundColorContext";
import { useContext, useState } from "react";
export default function Hero() {
  // const [hideHero, setHideHero] = useState(false);

  const backgroundColorContext = useContext(BackgroundColorContext);

  return (
    <>
      <div className="md:p-4">
        <div className={`md:border ${backgroundColorContext.backgroundColorState.border_color} border-opacity-60 rounded-lg flex flex-col capitalize `}>
          <div className="flex md:items-center gap-4 rounded-lg text-lighttext p-2">
            <div className="w-full rounded-lg p-4 flex flex-col gap-4 font-semibold">
              <div className="flex flex-col">
                {/* <span className={`${backgroundColorContext.backgroundColorState.main_text} font-bold text-3xl`}>
                  Introducing
                </span> */}
                <span className={`text-[#2962ff] text-5xl font-bold`}>
                NotesShelf
                </span>
              </div>
              <p className={`${backgroundColorContext.backgroundColorState.main_text} sm:text-4xl text-4xl`}>
                The ultimate digital content for University Exams
              </p>
              <div className={`${backgroundColorContext.backgroundColorState.sub_text} hidden text-sm`}>
                <span>Important Topics For Exams | </span>
                <span>Internal Examination Content | </span>
                <span>Solved Previous year papers | </span>
                <span>Practical Exams content</span>
              </div>
              <span className="text-xs font-sans font-semibold text-[#444]">
                *We Are Currently Focusing On CSE Branch Only
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
