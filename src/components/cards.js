import { BackgroundColorContext } from "@/context/backgroundColorContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FaShare } from "react-icons/fa";

export default function Cards(props) {

  
  const backgroundColorContext = useContext(BackgroundColorContext);

  function excerptShortner(excerpt, title) {
    let excerptArr = excerpt.split(" ");
    // if(title.length>4){
      if (excerptArr.length > 20) {
      excerptArr.splice(20, excerptArr.length - 20, "...");
    }
    // }
    // else if(title.length>8){
    //   if (excerptArr.length > 10) {
    //     excerptArr.splice(10, excerptArr.length - 10, "...");
    //   }
    // }
    // else {
    //   if (excerptArr.length > 20) {
    //     excerptArr.splice(20, excerptArr.length - 20, "...");
    //   }
    // }
    
    return excerptArr.join(" ");
  }

  const [linkCopied, setLinkCopied] = useState(false);
  const [clipBoardVariable, setClipBoardVariable] = useState(false);

  function clipBoardCopiedHandler(slug) {
    if (clipBoardVariable == slug) {
      return <span>Link Copied!!!</span>;
    }
    return (
      <div className="flex items-center justify-center gap-1">
        <span>Share Link</span>
        <span>
          <FaShare />
        </span>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-4">
      {props.posts
        ? props.posts.map((e) => {
            return (
              <div
                key={e.id}
                className={`h-full p-4 rounded-lg grid grid-rows-1 gap-2 shadow-md ${backgroundColorContext.backgroundColorState.card_background}`}
              >
                <Link href={`/${e.subject.slug}/${e.slug}`}>
                  <div className="pb-2">
                    {e?.coverImage?.url ? (
                      <div className="h-[200px] w-full">
                        <Image
                          className="w-full h-full p-0 rounded-lg"
                          src={e.coverImage.url}
                          alt={e.title}
                          width={960}
                          height={540}
                          priority={false}
                        />
                      </div>
                    ) : (
                      <div
                        className={`rounded-lg h-[200px] flex items-center justify-center w-full px-4 text-3xl font-bold`}
                        style={{
                          backgroundImage: `linear-gradient(to right, rgb(${
                            Math.floor(Math.random() * 150) + 50
                          }, ${Math.floor(Math.random() * 160) + 100},${
                            Math.floor(Math.random() * 250) + 200
                          }) , rgb(${Math.floor(Math.random() * 150) + 50}, ${
                            Math.floor(Math.random() * 125) + 50
                          },${Math.floor(Math.random() * 125) + 100}))`,
                        }}
                      >
                        {e.title}
                      </div>
                    )}
                  </div>

                  <div className=" h-min flex flex-col gap-2 rounded-lg overflow-hidden font-semibold">
                    <div className={`${backgroundColorContext.backgroundColorState.main_text} h-min text-[1.1rem]`}>
                      <p>{e.title}</p>
                    </div>
                    <div className={`${backgroundColorContext.backgroundColorState.gray_text} text-[0.92rem]`}>
                      {e?.excerpt ? (
                        <p>{excerptShortner(e.excerpt, e.title)}</p>
                      ) : (
                        <p>No preview Available</p>
                      )}
                    </div>
                    <br />
                  </div>
                </Link>
                <div className="pb-2 flex flex-wrap justify-between items-center gap-2 text-center text-xs font-semibold rounded-lg">
                  <div className="hidden flex-grow w-max bg-gray-background py-1 px-2 rounded-lg">
                    {e.category.map((category) => {
                      return (
                        <span key={e.id}>{category.split("_").join(" ")}</span>
                      );
                    })}
                  </div>
                  <div
                    className={`flex-grow w-max ${backgroundColorContext.backgroundColorState.sub_text} bg-opacity-50 ${backgroundColorContext.backgroundColorState.app_background} bg-opacity-50 py-2 px-2 rounded-lg cursor-pointer`}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        process.env.NODE_ENV == "production"
                          ? `${process.env.PRODUCTION_URL}/${e.subject.slug}/${e.slug}`
                          : `http://localhost:3000/${e.subject.slug}/${e.slug}`
                      );
                      setClipBoardVariable(e.slug);
                    }}
                  >
                    {clipBoardCopiedHandler(e.slug)}
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}
