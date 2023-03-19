import Cards from "@/components/cards";
import OnGoingExams from "../onGoingExams";

export default function LatestPosts(props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <br />
      <div className="md:w-[80%] w-full px-2">
        <OnGoingExams semesters={props.semesters} />
      </div>

      <div className="p-2 w-full flex flex-col mb-14">
        <div className="font-bold text-lg py-4 md:pl-8 pl-2">Latest Posts</div>
        <div className="lg:px-8 px-4 md:p-0 md:w-[90%] m-auto">
          <Cards posts={props.posts} />
        </div>
      </div>
    </div>
  );
}
