import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MdClose, MdMinimize, MdMaximize, MdInfo } from "react-icons/md";
import rehypeHighlightCodeBlock from "@mapbox/rehype-highlight-code-block";
import {MDXComponents} from "@/components/mdxComponents";

let history = [];
export default function AskQuestions(props) {
  const [questionAsked, setQuestionAsked] = useState([]);
  const [answerLoading, setAnswerLoading] = useState("");
  const [maximiseWindow, setMaximiseWindow] = useState(false);
  const [openInfoWindow, SetOpenInfoWindow] = useState(false);
  const { subjectId } = useRouter().query;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("questionsAskedStorage");
      setQuestionAsked(stored ? JSON.parse(stored) : []);
      history = stored ? JSON.parse(stored) : []
    }
  }, []);

  async function askQuestionFetchHandler() {
    setAnswerLoading("loading");
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
                .join(" ")} always elaborate the answer`
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
      history.push({ question: inputValue, answer: mdxSource })
      setQuestionAsked(history);
      setAnswerLoading("complete");
      localStorage.setItem(
        "questionsAskedStorage",
        JSON.stringify(history)
      );
    } catch (error) {
      console.log("error login try catch : " + error);
      return;
    }
  }

  const [inputValue, setInputValue] = useState("");

  return (
    <div
      className={`z-0 h-[86vh] md:h-[91vh] border-2 border-border-dark border-opacity-30 shadow-md backdrop-filter bg-card-dark flex flex-col items-center absolute right-1 md:right-2 top-[60px] rounded-lg w-[98%] ${
        maximiseWindow ? "md:w-[99%]" : "md:w-[60%]"
      }`}
    >
      <div className="flex justify-between w-full px-2 py-1 border-b border-gray-800">
        <div className="min-w-max flex items-center">
          <div
            className="italic flex items-center text-gray-500 font-semibold text-xs cursor-pointer"
            onClick={() => SetOpenInfoWindow(!openInfoWindow)}
          >
            <MdInfo className="cursor-pointer text-gray-600" />
            Tips
          </div>
          <div
            className={`${
              openInfoWindow ? "" : "hidden"
            } absolute top-9 bg-gray-background rounded-lg py-4 px-8`}
          >
            <button
              className="relative bottom-3 left-full text-gray-500 font-semibold"
              onClick={() => SetOpenInfoWindow(false)}
            >
              x
            </button>
            <ul className="list-disc ml-2 italic text-gray-500 font-semibold text-xs">
              <li>You can add word limit to answers response</li>
              <li>Get answers relevant to topic you mention</li>
              <li>You can add word limit to answer's response</li>
              <li>Get answers relevant to topic you mention</li>
              <li>You can add word limit to answers responsess</li>
              <li>Get answers relevant to topic you mention</li>
            </ul>
          </div>
        </div>
        <div className="px-4 w-full p-1 hidden md:flex flex-row justify-end gap-2 text-gray-600">
          {!maximiseWindow ? (
            <MdMaximize
              onClick={() => setMaximiseWindow(true)}
              className="cursor-pointer"
            />
          ) : (
            <MdMinimize
              onClick={() => setMaximiseWindow(false)}
              className="cursor-pointer"
            />
          )}
          <MdClose
            onClick={props.askQuestionDisplay}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center gap-2 overflow-y-scroll">
        <div className="md:h-[82%] h-[86%] overflow-y-scroll scrollbarfeature w-full rounded-lg md:p-4 p-1">
          <div
            className={`flex flex-col gap-2 py-4 px-2 ${
              maximiseWindow ? "md:w-[60%] m-auto" : ""
            }`}
          >
            {questionAsked.map((e, index) => {
              return (
                <div key={index}>
                  <div className="bg-gray-600 p-2 w-full rounded-lg flex flex-row md:gap-4 gap-2">
                    <div className="leading-7 text-[16px] text-justify flex flex-row gap-4 items-start">
                      <span className="rounded-full bg-app-background p-1 px-2 text-xs mt-1">
                        Question
                      </span>
                      {e.question}
                    </div>
                  </div>
                  <div className={`p-2 w-full rounded-lg `}>
                    <div className="leading-7 text-[16px] text-justify">
                      <div className="rounded-full bg-app-background p-1 px-2 text-xs mt-1 w-min">
                        Answer
                      </div>
                        <div className={``}>
                          <MDXRemote
                            {...e.answer}
                            components={MDXComponents}
                          />
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full h-[10%] md:pt-4 pt-2">
          <form
            className={`h-[70%] md:h-full m-auto flex justify-center gap-2 bg-transparent border border-gray-700 rounded-lg px-2 py-1 ${
              maximiseWindow ? "md:w-[60%] m-auto" : "w-[90%]"
            }`}
            onSubmit={(e) => {
              e.preventDefault();
              askQuestionFetchHandler();
              setInputValue('')
            }}
          >
            <input
              type="text"
              placeholder="Type your Question, press enter or click on send button"
              className="w-full bg-transparent outline-none"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <button type="submit" className="bg-gray-700 rounded-lg px-4 py-1">
              <TbSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
