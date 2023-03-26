import { useEffect, useState } from "react";
import WindowLayout from "../sections/windowLayout";
import Cards from "../cards";
import { GET_ALL_SAVED_POST } from "graphql/queries";
import { graphCmsReadOnly } from "graphql/graphCmsClient";

export default function SavedPost({ colorPalette, ...props }) {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    fetchAllSavedPosts();
  }, []);

  async function fetchAllSavedPosts() {
    const allSavedPosts = await graphCmsReadOnly.request(GET_ALL_SAVED_POST, {
      email: "rk@rk.rk",
    });

    setSavedPosts(allSavedPosts.userSchema.savedposts);
  }

  return (
    <WindowLayout
      colorPalette={colorPalette}
      toggleWindowClose={props.savedPostDisplay}
      showTextSizeBar={false}
    >
      <div
        className={`w-[90%] m-auto h-full`}
      >
        <div className="h-[98%] scrollbarfeature overflow-y-scroll p-4">
          {savedPosts?.length == 0 ? (
            <span>No Saved Posts to display </span>
          ) : (
            <Cards posts={savedPosts} isLatest={true} />
          )}
        </div>
      </div>
    </WindowLayout>
  );
}
