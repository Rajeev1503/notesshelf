import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import QuickMenu from "@/components/sections/quick-menu";
import TopMenu from "@/components/sections/top-menu";
import CategorisedPosts from "@/components/sections/categorised-posts";
import {
  GET_ALL_SEMESTER,
  GET_ALL_SUBJECT,
  GET_POST_BY_SUBJECT_SLUG,
  GET_SUBJECT_BY_SLUG,
} from "graphql/queries";
import { graphcms } from "graphql/graphCmsClient";
import MobileMenu from "@/components/sections/mobile-menu";
import AskQuestions from "@/components/sections/AskQuestions/askQuestions";
import Layout from "@/layout/layout";

export default function Subject({ posts, subject, semesters }) {
  const [toggleMobileQuickMenu, setToggleMobileQuickMenu] = useState(true);
  const [askQuestionDisplay, setAskQuestionDisplay] = useState(false);

  return (
    <Layout
    title={`${subject.subjectName} - NotesShelf`}
      semesters={semesters}
      relatedPost={false}
      enableShareButton={true}
      enableAskQuestionButton={true}
      enableRelatedMenu={false}
      
      >
      
          <div className="scrollbarfeature sm:w-2/3 lg:w-[82%] w-full h-full flex flex-col gap-4 overflow-y-scroll">
            <CategorisedPosts posts={posts} semesters={semesters} />
          </div>
        
    </Layout>
  );
}

export async function getStaticPaths() {
  const { subjects } = await graphcms.request(GET_ALL_SUBJECT);
  const subjectPaths = subjects.map((subject) => ({
    params: { subjectId: subject.slug },
  }));
  return {
    paths: subjectPaths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = await params.subjectId;
  try {
    const { subject } = await graphcms.request(GET_SUBJECT_BY_SLUG, {
      slug: slug,
    });

    const { posts } = await graphcms.request(GET_POST_BY_SUBJECT_SLUG, {
      slug: slug,
    });
    const { semesters } = await graphcms.request(GET_ALL_SEMESTER);
    if (!subject || !posts || !semesters) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        posts: posts,
        subject: subject,
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
