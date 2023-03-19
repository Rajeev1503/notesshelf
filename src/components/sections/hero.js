import { useState } from "react";
export default function Hero() {
  const [hideHero, setHideHero] = useState(false);

  return (
    <>
      <div className={`${hideHero ? "hidden" : ""}`}>
        <div className="border-b border-border-dark border-opacity-30 lg:px-6 flex flex-col capitalize">
          <div className="flex md:items-center gap-4 rounded-lg text-lighttext p-4">
            <div className="w-full rounded-lg p-4 flex flex-col gap-4 font-semibold">
              <div className="flex flex-col">
                <span className="text-gray-200 font-bold text-4xl">
                  Introducing
                </span>{" "}
                <span className="text-accent-color text-5xl font-extrabold">
                NotesShelf
                </span>
              </div>
              <p className="sm:text-5xl text-4xl text-gray-200">
                The ultimate digital content for<br /> University Exams
              </p>
              <div className="text-gray-300 text-opacity-80 font-sans text-sm sm:text-normal">
                <span>Important Topics For Exams | </span>
                <span>Internal Examination Content | </span>
                <span>Solved Previous year papers | </span>
                <span>Practical Exams content</span>
              </div>
              <span className="text-xs font-sans font-semibold text-gray-600">
                *We Are Currently Focusing On CSE Branch Only
              </span>
              <button
                className="bg-accent-background w-[50%] md:w-[20%] py-2 px-4 text-xs text-gray-800 rounded-lg font-bold font-sans"
                onClick={() => setHideHero(true)}
              >
                Hide this section
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
