import {
  GET_ALL_POST,
  GET_ALL_SEMESTER,
  GET_POST_BY_SLUG,
  GET_POST_BY_SUBJECT_SLUG,
} from "graphql/queries";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { graphCmsReadOnly } from "graphql/graphCmsClient";
import { BiLike, BiComment, BiShare } from "react-icons/bi";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import Layout from "@/layout/layout";


import Image from "next/image";
import { useContext, useState } from "react";
import { BackgroundColorContext } from "@/context/backgroundColorContext";


export default function Post({ postContent, mdxContent, semesters, allPosts }) {

  const backgroundColorContext = useContext(BackgroundColorContext);
  const [sliderValue, setSliderValue] = useState(17);

  const MDXComponents = {
    wrapper: (props) => (
      <div className="" style={{fontSize:sliderValue+'px', lineHeight:sliderValue/9}}>
        <main>{props.children}</main>
      </div>
    ),
    p: (props) => (
      <p className={`${backgroundColorContext.backgroundColorState.sub_text}`}>
        {props.children}
      </p>
    ),
  
    h3: (props) => (
      <h1 className={`text-xl font-semibold py-6 mt-10 border-t-2 ${backgroundColorContext.backgroundColorState.border_color} border-opacity-50`}>
        {props.children}
      </h1>
    ),
    strong: (props) => (
      <strong className="font-bold">
        {props.children}
      </strong>
    ),
    em: (props) => <em className="text-lg">{props.children}</em>,
    li: (props) => (
      <ul className="list-disc ml-8">
        <li className="">{props.children}</li>
      </ul>
    ),
    img: (props) => <Image {...props} width={2250} height={1390} />,
  
    code: (props) => (
      <div className={`bg-[#111] bg-opacity-80 backdrop-blur-xl overflow-x-scroll hideScrollBar p-4 rounded-lg my-4`}>{props.children}</div>
    ),
  };

  return (
    <Layout
      title={`${postContent.title} - NotesShelf`}
      semesters={semesters}
      allPosts={allPosts}
      relatedPost={true}
      enableShareButton={true}
      enableAskQuestionButton={true}
      enableRelatedMenu={true}
      excerpt={postContent.excerpt}
      coverImage={postContent.coverImage.url}
    >
        <div className="mt-2 sm:w-[90%] w-[98%] m-auto h-full p-2 rounded-lg">

          <div className="px-2 lg:px-10 w-full pb-24">
          <div
            className={`${backgroundColorContext.backgroundColorState.card_background} w-full p-1 px-4 rounded-lg cursor-pointer min-w-max flex items-center justify-between gap-2`}
          >
            <span className="min-w-max text-xs font-semibold">Text Size</span>
            <div className="w-full flex gap-2 items-center">
              <button className="disabled:cursor-not-allowed" disabled={sliderValue<15} onClick={() => setSliderValue((prevValue)=>prevValue-1)}>-</button>
              <input
                type="range"
                min="14"
                max="25"
                className="slider w-full"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
              />
              <button className="disabled:cursor-not-allowed" disabled={sliderValue>24} onClick={() => setSliderValue((prevValue)=>prevValue+1)}>+</button>
            </div>
        </div>
            <div className="flex flex-col gap-10 ">
              <div className=" border-b-2 border-gray-800 border-opacity-50 py-10">
                <h1 className="flex-grow max-w-max text-3xl font-semibold">
                  {postContent.title}
                </h1>
              </div>
              <div className="md:px-8 px-0">
                <MDXRemote {...mdxContent} components={MDXComponents} />
              </div>
            </div>
            <div className="mb-8 justify-center hidden">
              <div className="max-w-min border border-[#13131e] bg-[#13131e] bg-opacity-30 rounded-full flex flex-row items-center gap-8 font-semibold text-xl px-8 p-2">
                <div className="bg-[#13131e] px-4 py-2 rounded-2xl hover:scale-105 text-gray-300 hover:text-white cursor-pointer">
                  <BiLike />
                </div>
                <div className="bg-[#13131e] px-4 py-2 rounded-2xl hover:scale-105 text-gray-300 hover:text-white cursor-pointer">
                  <BiComment />
                </div>
                <div className="bg-[#13131e] px-4 py-2 rounded-2xl hover:scale-105 text-gray-300 hover:text-white cursor-pointer">
                  <BiShare />
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { posts } = await graphCmsReadOnly.request(GET_ALL_POST);
  const paths = posts.map((post) => ({
    params: { postId: post.slug, subjectId: post.subject.slug },
  }));
  return { paths: paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { subjectId, postId } = params;
  try {
    const { post } = await graphCmsReadOnly.request(GET_POST_BY_SLUG, { slug: postId });
    const { semesters } = await graphCmsReadOnly.request(GET_ALL_SEMESTER);
    const { posts } = await graphCmsReadOnly.request(GET_POST_BY_SUBJECT_SLUG, {
      slug: subjectId,
    });

    if (!posts || !semesters || !post) {
      return {
        notFound: true,
      };
    } else {
      const { postContent, ...restContent } = post;
      const mdxSource = await serialize(postContent, {
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            rehypeHighlight,
          ],
        },
      });

      return {
        props: {
          mdxContent: mdxSource,
          postContent: restContent,
          semesters: semesters,
          allPosts: posts,
        },
        revalidate: 10,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
