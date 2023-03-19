import QuickMenu from "@/components/sections/quick-menu";
import TopMenu from "@/components/sections/top-menu";
import Head from "next/head";
import {
  GET_ALL_POST,
  GET_ALL_SEMESTER,
  GET_POST_BY_SLUG,
  GET_POST_BY_SUBJECT_SLUG,
} from "graphql/queries";
import { useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import RelatedPosts from "@/components/sections/related-posts";
import { graphcms } from "graphql/graphCmsClient";
import MobileMenu from "@/components/sections/mobile-menu";
import { BiLike, BiComment, BiShare } from "react-icons/bi";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import AskQuestions from "@/components/sections/AskQuestions/askQuestions";
import Layout from "@/layout/layout";

const components = {
  wrapper: (props) => (
    <div className="text-[1.125rem] text-gray-200 md:text-justify text-left">
      <main>{props.children}</main>
    </div>
  ),
  p: (props) => (
    <p
      className="pb-8 text-[#c6c6c6]"
      style={{
        lineHeight: "1.77777778",
        fontSize: "1.125rem",
      }}
    >
      {props.children}
    </p>
  ),

  h3: (props) => (
    <h1 className="text-2xl font-semibold py-6 mt-10 border-t-2 border-gray-800 border-opacity-50">
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
    <ul className="list-disc ml-8 pb-2">
      <li className="font-semibold text-[#c6c6c6] text-lg">{props.children}</li>
    </ul>
  ),
  img: (props) => <Image {...props} width={2250} height={1390} />,

  custom: (props) => <span>{props.children}</span>,
};

export default function Post({ postContent, mdxContent, semesters, allPosts }) {

  return (
    <Layout
      title={`${postContent.title} - NotesShelf`}
      semesters={semesters}
      allPosts={allPosts}
      relatedPost={true}
      enableShareButton={true}
      enableAskQuestionButton={true}
      enableRelatedMenu={true}
    >
      <div className="sm:w-[64%] w-full font-normal scrollbarfeature h-full overflow-y-scroll">
        <div className="mt-2 sm:w-[90%] w-[98%] m-auto h-full p-2 rounded-lg">
          <div className="px-2 lg:px-10 w-full pb-24">
            <div className="flex flex-col gap-10 ">
              <div className=" border-b-2 border-gray-800 border-opacity-50 py-10">
                {/* {postContent?.coverImage?.url?<Image src={postContent.coverImage.url} width={2250} height={1390}/>:<></>} */}
                <h1 className="flex-grow max-w-max text-3xl font-semibold">
                  {postContent.title}
                </h1>
              </div>
              <div className="md:px-8 px-0">
                <MDXRemote {...mdxContent} components={components} />
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
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(GET_ALL_POST);
  const paths = posts.map((post) => ({
    params: { postId: post.slug, subjectId: post.subject.slug },
  }));
  return { paths: paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { subjectId, postId } = params;
  try {
    const { post } = await graphcms.request(GET_POST_BY_SLUG, { slug: postId });
    const { semesters } = await graphcms.request(GET_ALL_SEMESTER);
    const { posts } = await graphcms.request(GET_POST_BY_SUBJECT_SLUG, {
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
