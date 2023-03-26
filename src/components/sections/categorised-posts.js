import Cards from "@/components/cards";
import { BackgroundColorContext } from "@/context/backgroundColorContext";
import { useContext } from "react";
import OnGoingExams from "../onGoingExams";

export default function CategorisedPosts(props) {

  
  const backgroundColorContext = useContext(BackgroundColorContext);

  const categoryArray = [];
  let postArray = [];
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="md:w-[80%] w-[95%] m-auto mt-14">
        <OnGoingExams semesters={props.semesters} />
      </div>
      <div className="p-2 w-full flex flex-col">
        <div className="font-bold text-lg py-4 pt-8">
          {props.posts.length == 0 ? (
            <p className="font-semibold capitalize pl-8">
              No posts yet, will add soon !!!
            </p>
          ) : (
            ""
          )}
          {props.posts.map((post) => {
            return post.category.map((category) => {
              {
                postArray = [];
              }
              if (!categoryArray.includes(category)) {
                categoryArray.push(category);
                return (
                  <div className="pb-14" key={post.id}>
                    <div className={`${backgroundColorContext.backgroundColorState.gray_text} pb-6 pl-2 sm:pl-12`}>
                      <p>{category.split("_").join(" ")}</p>
                    </div>
                    {props.posts.map((e) => {
                      if (e.category.includes(category)) postArray.push(e);
                    })}

                    <div className="lg:px-4 md:p-0 md:w-[90%] m-auto mb-4">
                      <Cards posts={postArray} isLatestPage={false}/>
                    </div>
                  </div>
                );
              }
            });
          })}
        </div>
      </div>
    </div>
  );
}
