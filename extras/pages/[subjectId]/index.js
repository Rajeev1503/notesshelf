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
import AskQuestions from "@/components/AskQuestions/askQuestions";

export default function Subject({ posts, subject, semesters }) {
  const [toggleMobileQuickMenu, setToggleMobileQuickMenu] = useState(true);
  const [askQuestionDisplay, setAskQuestionDisplay] = useState(false);

  return (
    <>
      <Head>
        <title>{`${subject.subjectName} - NotesShelf`}</title>
        <meta name="description" content={`${subject.subjectName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className="bg-app-background flex flex-col w-full text-[#e5e5e5]"
        style={{ height: "100vh" }}
      >
        <div className="p-2 border-b border-border-dark">
          <TopMenu
            enableShareButton={true}
            enableAskQuestionButton={true}
            askQuestionDisplay={() =>
              setAskQuestionDisplay(!askQuestionDisplay)
            }
          />
        </div>
        <div
          className="flex sm:flex-row flex-col w-full h-full"
          style={{ height: "90vh" }}
        >
          <div
            className={`bg-app-background scrollbarfeature border-r border-border-dark sm:w-1/3 lg:lg:w-[18%] p-4 h-full overflow-y-scroll sm:block w-full ${
              !toggleMobileQuickMenu ? "absolute z-2" : "hidden"
            } `}
          >
            <div className="flex w-full z-40">
              <div className="w-5/6 sm:w-full">
                <QuickMenu
                  semesters={semesters}
                  toggleMobileQuickMenu={() => setToggleMobileQuickMenu(true)}
                />
              </div>
              <div
                className="w-1/6 md:hidden bg-transparent"
                onClick={() => setToggleMobileQuickMenu(true)}
              ></div>
            </div>
          </div>
          <div className="scrollbarfeature sm:w-2/3 lg:w-[82%] w-full h-full flex flex-col gap-4 overflow-y-scroll">
            <CategorisedPosts posts={posts} semesters={semesters} />
          </div>
        </div>
        <MobileMenu
          toggleMobileQuickMenu={() =>
            setToggleMobileQuickMenu(!toggleMobileQuickMenu)
          }
          enableAskQuestionButton={true}
          askQuestionDisplay={() => setAskQuestionDisplay(!askQuestionDisplay)}
          enableRelatedMenu={false}
        />
        <div
          className={`${askQuestionDisplay ? "flex items-center" : "hidden"}`}
        >
          <AskQuestions
            askQuestionDisplay={() => setAskQuestionDisplay(false)}
          />
        </div>
      </div>
    </>
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
