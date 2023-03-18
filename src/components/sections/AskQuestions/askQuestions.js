import { useRouter } from "next/router";
import { useState } from "react";
import { TbSend } from "react-icons/tb";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MdClose, MdMinimize, MdMaximize, MdInfo } from "react-icons/md";
import rehypeHighlightCodeBlock from "@mapbox/rehype-highlight-code-block";
const components = {
  wrapper: (props) => (
    <div className="text-[1rem] text-gray-200 md:text-justify text-left">
      <main>{props.children}</main>
    </div>
  ),
  p: (props) => (
    <p
      className="pb-8 text-[#c6c6c6]"
      style={{
        lineHeight: "1.77777778",
        fontSize: "1rem",
      }}
    >
      {props.children}
    </p>
  ),

  h3: (props) => (
    <h1 className="text-xl font-semibold py-6 mt-10 border-t-2 border-gray-800 border-opacity-50">
      {props.children}
    </h1>
  ),
  strong: (props) => (
    <strong className="text-lg font-bold text-gray-200">
      {props.children}
    </strong>
  ),
  em: (props) => <em className="text-lg">{props.children}</em>,
  li: (props) => (
    <ul className="list-disc ml-4 pb-2">
      <li className="text-[#c6c6c6]">{props.children}</li>
    </ul>
  ),
  img: (props) => <Image {...props} width={2250} height={1390} />,

  code: (props) => (
    <div className="bg-[#13131e] p-4 rounded-lg my-4">{props.children}</div>
  ),
};

export default function AskQuestions(props) {
  const [responseData, setResponseData] = useState();
  // const [questionAsked, setQuestionAsked] = useState();
  const [answerLoading, setAnswerLoading] = useState("");
  const [maximiseWindow, setMaximiseWindow] = useState(false);
  const [openInfoWindow, SetOpenInfoWindow] = useState(false);
  const { subjectId } = useRouter().query;
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
                .join(" ")} in minimum 10 words`
          ),
        }
      );

      const responseDataJson = await response.json();
      if (!response.ok) {
        throw new Error(
          "Login failed message from frontend : " + responseDataJson.message
        );
      }

      const data = JSON.stringify(responseDataJson);
      const answer = JSON.parse(data);
      const mdxSource = await serialize(answer.data, {
        mdxOptions: { development: process.env.NODE_ENV === "development" },
        rehypePlugins: [rehypeHighlightCodeBlock],
      });
      console.log(mdxSource);
      setResponseData(mdxSource);
      return setAnswerLoading("complete");
    } catch (error) {
      console.log("error login try catch : " + error);
      return;
    }
  }

  const [inputValue, setInputValue] = useState("");

  return (
    <div
      className={`h-[85vh] md:h-[90vh] shadow-2xl flex flex-col items-center absolute border border-[#1a1a2e] bg-[#1a1a2e] right-1 md:right-2 top-[60px] rounded-lg w-[98%] ${
        maximiseWindow ? "md:w-[99%]" : "md:w-[60%]"
      }`}
    >
      <div className="flex justify-between w-full px-2">
        <div className="min-w-max flex items-center">
          <div className="italic flex items-center text-gray-500 font-semibold text-xs cursor-pointer" onClick={()=>SetOpenInfoWindow(!openInfoWindow)}>
          <MdInfo className="cursor-pointer text-gray-600"/>
            Tips
          </div>
          <div className={`${openInfoWindow?'': 'hidden'} absolute top-8 bg-gray-900 rounded-lg px-4 py-4`}>
              <button className="relative bottom-4 left-full text-gray-500 font-semibold" onClick={()=>SetOpenInfoWindow(false)}>x</button>
              <ul className="list-disc ml-2 italic text-gray-500 font-semibold text-xs">
                <li>
                  You can add word limit to answers response
                </li>
                <li>
                  Get answers relevant to topic you mention
                </li>
                <li>
                  You can add word limit to answers response
                </li>
                <li>
                  Get answers relevant to topic you mention
                </li>
                  <li>
                    You can add word limit to answers response
                  </li>
                  <li>
                    Get answers relevant to topic you mention
                  </li>
                
              </ul>
          </div>
        </div>
        <div className="px-4 border-b border-gray-800 w-full p-1 hidden md:flex flex-row justify-end gap-2 text-gray-600">
          {!maximiseWindow ? (
            <MdMaximize onClick={() => setMaximiseWindow(true)} className="cursor-pointer"/>
          ) : (
            <MdMinimize onClick={() => setMaximiseWindow(false)} className="cursor-pointer"/>
          )}
          <MdClose onClick={props.askQuestionDisplay} className="cursor-pointer"/>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-2 h-full">
        <div className="md:h-[82%] h-[86%] w-full rounded-lg md:p-4 p-1 overflow-y-scroll scrollbarfeature">
          <div
            className={`flex flex-col gap-2 py-4 px-2 ${
              maximiseWindow ? "md:w-[60%] m-auto" : ""
            }`}
          >
            <div className="bg-gray-600 p-2 w-full rounded-lg flex flex-row md:gap-4 gap-2">
              <div className="leading-7 text-[16px] text-justify flex flex-row gap-4 items-start">
                <span className="rounded-full bg-[#13131e] p-1 px-2 text-xs mt-1">
                  Question
                </span>
                {inputValue}
              </div>
            </div>
            <div className={`p-2 w-full rounded-lg `}>
              <div className="leading-7 text-[16px] text-justify">
                <div className="rounded-full bg-[#13131e] p-1 px-2 text-xs mt-1 w-min">
                  Answer
                </div>
                {answerLoading === "loading" ? (
                  <div>loading...</div>
                ) : answerLoading === "complete" ? (
                  <div className={``}>
                    <MDXRemote {...responseData} components={components} />
                  </div>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
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
            }}
          >
            <input
              type="text"
              placeholder="Type your Question, press enter or click on send button"
              className="w-full bg-transparent outline-none"
              onChange={(e) => setInputValue(e.target.value)}
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
