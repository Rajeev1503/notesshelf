import Cards from "@/components/cards";
import Related from "../related";

export default function CategorisedPosts(props) {
  const categoryArray = [];
  let postArray =[];
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
        <Related semesters={props.semesters}/>
      </div>

      <div className="p-2 w-full flex flex-col">
        <div className="font-bold text-lg py-4 pt-8">
          {(props.posts.length==0)?<p className="font-semibold capitalize pl-8">No posts yet, will add soon !!!</p>:''}
          {props.posts.map((post) => {
            return post.category.map((category) => {
              {postArray = []}
              if (!categoryArray.includes(category)) {
                categoryArray.push(category);
                return (
                  <div className="pb-14" key={post.id}>
                    <div className="pb-6 text-gray-400 pl-2 sm:pl-12">
                      <p>{category.split("_").join(" ")}</p>
                    </div>
                    {props.posts.map((e)=>{
                      if(e.category.includes(category))
                      postArray.push(e);
                    })}
                    
                    <div className="lg:px-4 px-4 md:p-0 md:w-[90%] m-auto mb-4">
                      <Cards posts={postArray} />
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