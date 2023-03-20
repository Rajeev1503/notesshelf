import Cards from "@/components/cards";
import { BackgroundColorContext } from "@/context/backgroundColorContext";
import { useContext } from "react";
import OnGoingExams from "../onGoingExams";

export default function LatestPosts(props) {

  const backgroundColorContext = useContext(BackgroundColorContext);

  return (
    <div className="flex flex-col items-center gap-2">
      
      <div className="md:w-[80%] w-[95%] m-auto mt-14">
              <OnGoingExams semesters={props.semesters} />
            </div>
      <div className="p-2 w-full flex flex-col mb-14">
        <div className={`${backgroundColorContext.backgroundColorState.gray_text} font-bold text-lg py-4 md:pl-8 pl-2`}>Latest Posts</div>
        <div className="lg:px-8 px-4 md:p-0 md:w-[90%] m-auto">
          <Cards posts={props.posts} />
        </div>
      </div>
    </div>
  );
}
