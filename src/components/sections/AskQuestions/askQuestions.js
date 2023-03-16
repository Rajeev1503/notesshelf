import { TbSend } from "react-icons/tb";
export default function AskQuestions(props) {
  return (
    <div
      className="flex flex-col items-center gap-2 absolute border border-[#1a1a2e] bg-[#1a1a2e] right-2 top-[50px] rounded-lg w-[96%] md:w-[60%] p-0 md:p-4"
      style={{ height: "80.5vh" }}
    >
      <div className="h-[92%] w-full rounded-lg md:p-4 p-1 overflow-y-scroll scrollbarfeature">
        <div className="flex flex-col gap-2 ">
          <div className="bg-gray-600 p-2 w-full rounded-lg flex flex-row md:gap-4 gap-2">
            <div className="rounded-full text-md bg-[#13131e] p-1 px-2 h-min">Q</div>
            <p>
              Lorem Ipsum, Why do we use it? Lorem Ipsum, Why do we use it? Lorem
              Ipsum, Why do we use it? Lorem Ipsum, Why do we use it?
            </p>
          </div>
            <div className="p-2 w-full rounded-lg">
            
              <p className="leading-7 text-[16px] text-justify"><span className="rounded-full bg-[#13131e] p-1 px-2 h-min mr-4">
              A
            </span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[10%] border-t border-gray-800 pt-4">
        <div className="w-[90%] h-full m-auto flex justify-center gap-2 bg-transparent border border-gray-700 rounded-lg px-2 py-1">
          <input
            type="text"
            placeholder="Type your Question, press enter to send or click on send button"
            className="w-full bg-transparent outline-none"
          />
          <button className="bg-gray-700 rounded-lg px-4 py-1">
            <TbSend />
          </button>
        </div>
      </div>
    </div>
  );
}
