import Cards from "@/components/cards";
import Related from "../related";

export default function LatestPosts(props) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* <div className="md:w-3/6 w-5/6 flex justify-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent border border-[#1a1a2e] rounded-lg px-2 py-1"
        />
        <button className="bg-[#1a1a2e] rounded-lg px-2 py-1">Search</button>
      </div> */}
      <br />
      <div className="md:w-[80%] w-full px-2">
        <Related semesters={props.semesters} />
        {/* <button className="bg-[#222] rounded-lg px-2 text-center">
          Enable relevant content on top
        </button> */}
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
