import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MdClose, MdMinimize, MdMaximize } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import rehypeHighlightCodeBlock from "@mapbox/rehype-highlight-code-block";
import Image from "next/image";

let history = [];

export default function AskQuestions({ colorPalette, ...props }) {
  const {
    app_background,
    card_background,
    border_color,
    sub_text,
    gray_text,
    accent_background
  } = colorPalette;

  const MDXComponents = {
    wrapper: (props) => (
      <div className={``} style={{fontSize:sliderValue+'px', lineHeight:sliderValue/9}}>
        <main>{props.children}</main>
      </div>
    ),
    p: (props) => <p className={`${sub_text}`}>{props.children}</p>,

    h3: (props) => (
      <h1
        className={`text-xl font-semibold py-6 mt-10 border-t-2 ${border_color} border-opacity-50`}
      >
        {props.children}
      </h1>
    ),
    strong: (props) => <strong className="font-bold">{props.children}</strong>,
    em: (props) => <em className="text-lg">{props.children}</em>,
    li: (props) => (
      <ul className="list-disc ml-8">
        <li className="">{props.children}</li>
      </ul>
    ),
    img: (props) => <Image {...props} width={2250} height={1390} />,

    code: (props) => (
      <div className={`${card_background} overflow-x-scroll hideScrollBar p-4 rounded-lg my-4`}>
        {props.children}
      </div>
    ),
  };

  const [questionAsked, setQuestionAsked] = useState([]);
  const [currentQuestionAsked, setCurrentQuestionAsked] = useState([]);
  const [answerLoading, setAnswerLoading] = useState("");
  const [maximiseWindow, setMaximiseWindow] = useState(false);
  const [clearHistoryToggle, setClearHistoryToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sliderValue, setSliderValue] = useState(17);

  const { subjectId } = useRouter().query;

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("useeffect");
      const stored = localStorage.getItem(subjectId);
      setQuestionAsked(stored ? JSON.parse(stored) : []);
      history = stored ? JSON.parse(stored) : [];
      setCurrentQuestionAsked([]);
    }
  }, [subjectId]);

  async function askQuestionFetchHandler() {
    setAnswerLoading("loading");
    setCurrentQuestionAsked(inputValue);
    try {
      const response = await fetch('/api/askquestion',
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(
            inputValue +
              ` answer question with respect to subject ${subjectId
                .split("-")
                .join(" ")}`
          ),
        }
      );

      const responseDataJson = await response.json();
      if (!response.ok) {
        throw new Error(
          "fetch failed message from frontend : " + responseDataJson.message
        );
      }

      const data = JSON.stringify(responseDataJson);
      const answer = JSON.parse(data);
      const mdxSource = await serialize(answer.data, {
        mdxOptions: { development: process.env.NODE_ENV === "development" },
        rehypePlugins: [rehypeHighlightCodeBlock],
      });
      history.push({ question: inputValue, answer: mdxSource });
      setQuestionAsked(history);
      setAnswerLoading("complete");
      localStorage.setItem(subjectId, JSON.stringify(history));
    } catch (error) {
      console.log("error login try catch : " + error);
      return;
    }
  }

  return (
    <div
      className={`z-0 h-[87.2vh] md:h-[92.5vh] md:border-2 ${border_color} ${app_background} border-opacity-30 shadow-md flex flex-col items-center absolute right-1 md:right-2 top-[53px] rounded-lg w-[98%] ${
        maximiseWindow ? "md:w-[99%]" : "md:w-[60%]"
      }`}
    >
      <div
        className={`flex md:justify-between justify-evenly gap-2 text-xs font-semibold w-full px-2 py-2 border-b ${border_color}`}
      >
        <div
          className={`${
            questionAsked.length == 0 ? "hidden" : ""
          } md:w-1/3 min-w-max flex items-center`}
          onClick={() => {
            setClearHistoryToggle(!clearHistoryToggle);
          }}
        >
          <div
            className={`${card_background} p-1 px-2 rounded-lg cursor-pointer max-w-max flex gap-1 items-center`}
          >
            <MdDelete  className="text-red-500"/>
            Clear All
          </div>

          {clearHistoryToggle ? (
            <div className={`absolute top-10 ${card_background} p-8 rounded-lg`}>
              <div>Confirm delete? This action is irreversible</div>
              <br/>
              <div className="flex gap-2 items-center justify-center">
                <button
                className={`text-white bg-red-500 p-1 px-2 rounded-lg cursor-pointer max-w-max`}
                  onClick={() => {
                    localStorage.removeItem(subjectId);
                    setQuestionAsked([]);
                    setCurrentQuestionAsked([]);
                    history = [];
                    setClearHistoryToggle(false);
                  }}
                >
                  Delete
                </button>
                <button
                className={`${card_background} p-1 px-2 rounded-lg cursor-pointer max-w-max`}
                onClick={() => setClearHistoryToggle(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="md:w-1/3 max-w-max">
          <div
            className={`${card_background} p-1 px-4 rounded-lg cursor-pointer min-w-max flex items-center justify-between gap-2`}
          >
            <span className="max-w-max">Text Size</span>
            <div className="max-w-full flex gap-2 items-center">
              <button className="disabled:cursor-not-allowed" disabled={sliderValue<15} onClick={() => setSliderValue((prevValue)=>prevValue-1)}>-</button>
              <input
                type="range"
                min="14"
                max="25"
                className="slider w-24"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
              />
              <button className="disabled:cursor-not-allowed" disabled={sliderValue>24} onClick={() => setSliderValue((prevValue)=>prevValue+1)}>+</button>
            </div>
          </div>
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

      <div className="w-full h-full flex flex-col items-center gap-2 overflow-y-scroll">
        <div className="md:h-[82%] h-[86%] overflow-y-scroll scrollbarfeature w-full rounded-lg md:p-4 p-1">
          <div
            className={`flex flex-col gap-2 py-4 px-2 ${
              maximiseWindow ? "md:w-[60%] m-auto" : ""
            }`}
          >
            {questionAsked.length == 0 && currentQuestionAsked.length == 0 ? (
              <div className="relative top-24 font-semibold w-[90%] md:w-[70%] m-auto text-sm">
                <p className={`p-2 pb-4 text-xs rounded-lg ${gray_text}`}>
                  Tips
                </p>
                <ul className="flex flex-col gap-2">
                  <li className={`${card_background} p-2 px-4 rounded-lg`}>
                    You can add word limit to answers response
                  </li>
                  <li className={`${card_background} p-2 px-4 rounded-lg`}>
                    Get answers relevant to topic you mention
                  </li>
                  <li className={`${card_background} p-2 px-4 rounded-lg`}>
                    You can add word limit to answers response
                  </li>
                  <li className={`${card_background} p-2 px-4 rounded-lg`}>
                    Get answers relevant to topic you mention
                  </li>
                  <li className={`${card_background} p-2 px-4 rounded-lg`}>
                    You can add word limit to answers response
                  </li>
                  <li className={`${card_background} p-2 px-4 rounded-lg`}>
                    Get answers relevant to topic you mention
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
            {questionAsked.map((e, index) => {
              return (
                <div className="pb-10" key={index}>
                  <div
                    className={`${card_background} p-2 w-full rounded-lg flex flex-row md:gap-4 gap-2`}
                  >
                    <div className="font-semibold flex flex-row gap-4 items-start">
                      <span
                        className={`${app_background} bg-opacity-50 rounded-lg p-1 px-2 text-xs mt-1`}
                      >
                        Question
                      </span>
                      {e.question}
                    </div>
                  </div>
                  <div className={`p-2 w-full rounded-lg `}>
                    <div className="leading-7 px-4">
                      <div className={``}>
                        <MDXRemote {...e.answer} components={MDXComponents} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {answerLoading === "loading" ? (
              <div>
                <div
                  className={`${card_background} p-2 w-full rounded-lg flex flex-row md:gap-4 gap-2`}
                >
                  <div className="leading-7 text-[16px] text-justify flex flex-row gap-4 items-start">
                    <span className="rounded-full bg-app-background p-1 px-2 text-xs mt-1">
                      Question
                    </span>
                    {currentQuestionAsked}
                  </div>
                </div>
                <div className={`p-2 w-full rounded-lg `}>
                  <div className="px-4">
                    <div className={`py-2`}>Loading ...</div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="w-full h-[10%] md:pt-4 pt-2">
          <form
            className={`h-[70%] md:h-full m-auto flex justify-center gap-2 bg-transparent border ${border_color} rounded-lg px-2 py-1 ${
              maximiseWindow ? "md:w-[60%] m-auto" : "w-[90%]"
            }`}
            onSubmit={(e) => {
              e.preventDefault();
              askQuestionFetchHandler();
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
              className={`${accent_background} bg-opacity-50 rounded-lg px-4 py-1`}
            >
              <TbSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
