import Hero from "@/components/sections/hero";
import { GET_ALL_LATEST_POST, GET_ALL_SEMESTER } from "graphql/queries";
import LatestPosts from "@/components/sections/latest-posts";
import { graphCmsReadOnly } from "graphql/graphCmsClient";
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
        <div className="">
          <Hero />
        </div>
        <div className="mb-8">
          <LatestPosts posts={posts} semesters={semesters}/>
        </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { posts } = await graphCmsReadOnly.request(GET_ALL_LATEST_POST, {
      isLatest: true,
    });
    const { semesters } = await graphCmsReadOnly.request(GET_ALL_SEMESTER);

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
