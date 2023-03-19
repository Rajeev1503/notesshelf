import Head from "next/head";
import QuickMenu from "@/components/sections/quick-menu";
import TopMenu from "@/components/sections/top-menu";
import Hero from "@/components/sections/hero";
import { GET_ALL_LATEST_POST, GET_ALL_SEMESTER } from "graphql/queries";
import { useState } from "react";
import LatestPosts from "@/components/sections/latest-posts";
import { graphcms } from "graphql/graphCmsClient";
import MobileMenu from "@/components/sections/mobile-menu";
import Layout from "@/layout/layout";

export default function Home({ posts, semesters }) {

  return (
    <Layout
      title="NotesShelf"
      semesters={semesters}
      relatedPost={false}
      enableShareButton={false}
      enableAskQuestionButton={false}
      enableRelatedMenu={false}
    >
      <div className="scrollbarfeature sm:w-2/3 lg:w-[82%] w-full h-full flex flex-col gap-4 overflow-y-scroll pb-0">
        <div className="">
          <Hero />
        </div>
        <div className="mb-8">
          <LatestPosts posts={posts} semesters={semesters} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { posts } = await graphcms.request(GET_ALL_LATEST_POST, {
      isLatest: true,
    });
    const { semesters } = await graphcms.request(GET_ALL_SEMESTER);

    if (!posts || !semesters) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        posts: posts,
        semesters: semesters,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
