import { useRouter } from "next/router";
import React from "react";
import ExploreStoryItem from "./ExploreStoryItem";

const ExploreStoriesmain = () => {
  const router = useRouter();
  const subtab = router.query?.exploreSubTab;
  return (
    <div>
      storysubtab {subtab}
      {subtab === "story" && <ExploreStoryItem />}
    </div>
  );
};

export default ExploreStoriesmain;
