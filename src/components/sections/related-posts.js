import Link from "next/link";
export default function RelatedPosts(props) {
  const categoryArray = [];
  let postArray =[];
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <p className="text-xs font-bold text-gray-200">
          Related Posts
        </p>
        <br/>
        <div className="flex flex-col justify-between text-xs font-semibold rounded-lg py-1 capitalize">
          {(props.allPosts.length==0)?<p className="font-semibold capitalize">No post to show</p>:''}
          {props.allPosts.map((post) => {
            return post.category.map((category) => {
              {postArray = []}
              if (!categoryArray.includes(category)) {
                categoryArray.push(category);
                return (
                  <div className="pb-4" key={post.id}>
                    <div className=" text-gray-400">
                      <p>{category.split("_").join(" ")}</p>
                    </div>
                    {props.allPosts.map((e)=>{
                      if(e.category.includes(category))
                      postArray.push(e);
                    })}
                    
                {postArray.map((e)=>{
                  return (
                    <Link
                href={`/${e.subject.slug}/${e.slug}`}
                key={e.id}
                onClick={props.toggleAllMenus}
              >
                <div className=" text-xs flex flex-row flex-wrap gap-4 mt-2 font-semibold">
                  <div className="flex justify-between items-center gap-2 w-full border border-[#1a1a2e] text-[#bbb] hover:text-[#fff] hover:scale-105 cursor-pointer rounded-lg px-2 py-2">
                    <span className="pl-2">{e.title}</span>
                    {/* <span className="w-[30%] text-[#666]"></span> */}
                  </div>
                </div>
              </Link>
                  )
                })}

                  </div>
                );
              }
            });
          })}
        </div>
      </div>

          <br />
        </div>
  );
}

          // {props.allPosts.map((e) => {
          //   return (
          //     <Link
          //       href={`/${e.subject.slug}/${e.slug}`}
          //       key={e.id}
          //       onClick={props.toggleMobileQuickMenu}
          //     >
          //       <div className=" text-xs flex flex-row flex-wrap gap-4 mt-2 font-semibold">
          //         <div className="flex justify-between items-center gap-2 w-full border border-[#1a1a2e] text-[#bbb] hover:text-[#fff] hover:scale-105 cursor-pointer rounded-lg px-2 py-2">
          //           <span className="pl-2">{e.title}</span>
          //           {/* <span className="w-[30%] text-[#666]"></span> */}
          //         </div>
          //       </div>
          //     </Link>
          //   );
          // }).reverse()}