import { useRouter } from "next/router";
import React from "react";
import ExploreMainMenu from "./ExploreMainMenu";
import ExploreAllPage from "./exploreAll/ExploreAllPage";
import ExplorePostsMain from "./explorePosts/ExplorePostsMain";

const ExploreMain = () => {
  const router = useRouter();
  const tab = router.query?.exploreTab;
  return (
    <div className="flex-1 flex flex-col gap-4">
      <ExploreMainMenu />
      {(tab === "all" || !tab) && <ExploreAllPage />}
      {tab === "posts" && <ExplorePostsMain />}
    </div>
  );
};

export default ExploreMain;
