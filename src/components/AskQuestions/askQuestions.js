import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MdClose, MdMinimize, MdMaximize } from "react-icons/md";
import rehypeHighlightCodeBlock from "@mapbox/rehype-highlight-code-block";
import Image from "next/image";

let history = [];


export default function AskQuestions({colorPalette, ...props}) {

  const {
    current_mode,
    app_background,
    card_background,
    border_color,
    gray_background,
    accent_background,
    accent_text_color,
    accent_border_color,
    main_text,
    sub_text,
    gray_text
  } = colorPalette;

  const MDXComponents = {
    wrapper: (props) => (
      <div className="text-[1.125rem] leading-9 md:leading-9 text-text">
        <main>{props.children}</main>
      </div>
    ),
    p: (props) => (
      <p className={`${sub_text}`}>
        {props.children}
      </p>
    ),
  
    h3: (props) => (
      <h1 className={`text-xl font-semibold py-6 mt-10 border-t-2 ${border_color} border-opacity-50`}>
        {props.children}
      </h1>
    ),
    strong: (props) => (
      <strong className="font-bold">
        {props.children}
      </strong>
    ),
    em: (props) => <em className="text-lg">{props.children}</em>,
    li: (props) => (
      <ul className="list-disc ml-8">
        <li className="">{props.children}</li>
      </ul>
    ),
    img: (props) => <Image {...props} width={2250} height={1390} />,
  
    code: (props) => (
      <div className={`${card_background} p-4 rounded-lg my-4`}>{props.children}</div>
    ),
  };

  const [questionAsked, setQuestionAsked] = useState([]);
  const [currentQuestionAsked, setCurrentQuestionAsked] = useState([]);
  const [answerLoading, setAnswerLoading] = useState("");
  const [maximiseWindow, setMaximiseWindow] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { subjectId } = useRouter().query;

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("useeffect")
      const stored = localStorage.getItem(subjectId);
      setQuestionAsked(stored ? JSON.parse(stored) : []);
      history = stored ? JSON.parse(stored) : [];
      setCurrentQuestionAsked([])
    }
  }, [subjectId]);

  async function askQuestionFetchHandler() {
    setAnswerLoading("loading");
    setCurrentQuestionAsked(inputValue);
    try {
      const response = await fetch(
        process.env.NODE_ENV == "production"
          ? `https://notesshelf.vercel.app/api/askquestion`
          : `http://localhost:3000/api/askquestion`,
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
        className={`${
          questionAsked.length == 0 ? "hidden" : ""
        } md:flex justify-between w-full px-2 py-1 border-b ${border_color}`}
      >
        <button
          className={`${
            questionAsked.length == 0 ? "hidden" : ""
          } text-red-500 ${card_background} text-xs font-semibold min-w-max p-1 px-2 rounded-lg cursor-pointer flex items-center`}
          onClick={() => {
            localStorage.removeItem(subjectId);
            setQuestionAsked([]);
            setCurrentQuestionAsked([]);
            history = [];
          }}
        >
          Clear History (irreversible)
        </button>
        <div className="px-4 w-full p-1 hidden md:flex flex-row justify-end gap-2 text-xs">
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
                  <div className={`${card_background} p-2 w-full rounded-lg flex flex-row md:gap-4 gap-2`}>
                    <div className="font-semibold flex flex-row gap-4 items-start">
                      <span className={`${app_background} bg-opacity-50 rounded-lg p-1 px-2 text-xs mt-1`}>
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
                <div className={`${card_background} p-2 w-full rounded-lg flex flex-row md:gap-4 gap-2`}>
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
            <button type="submit" className={`${card_background} rounded-lg px-4 py-1`}>
              <TbSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
