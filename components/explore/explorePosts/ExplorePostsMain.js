import { useRouter } from "next/router";
import React from "react";
import ExplorePostItem from "./ExplorePostItem";

const ExplorePostsMain = () => {
  const router = useRouter();
  const subtab = router.query?.exploreSubTab;
  return (
    <div className="">
      subtab {subtab}
      {subtab === "post" && <ExplorePostItem />}
    </div>
  );
};

export default ExplorePostsMain;
