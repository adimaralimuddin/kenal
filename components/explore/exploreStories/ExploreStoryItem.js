import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import useExploreStories from "../../../controls/explore/useExploreStories";
import LikeMain from "../../reactions/LikeMain";
import StoryComments from "../../story/StoryComments";
import StoryItemViewer from "../../story/StoryItemViewer";

const ExploreStoryItem = () => {
  const router = useRouter();
  const { query } = router;
  const postId = query?.postId;
  const actionId = query?.actionId;
  const state = useExploreStories();
  const commentRef = useRef(null);

  useEffect(() => {
    state.listenStoryItem(postId);
  }, [postId]);

  useEffect(() => {
    const ret = setTimeout(() => {
      if (commentRef.current && postId && state.post && actionId) {
        commentRef.current?.click();
      }
    }, [1000]);

    return () => {
      clearTimeout(ret);
    };
  }, [postId, state.post, actionId]);

  const story = state.storyItem;

  return (
    <div className="flex h-full flex-col flex-1 ring-1d">
      <a ref={commentRef} href={"#" + actionId}></a>
      <div className="flex-1 flex flex-col sm:flex-row flex-wrap gap-4">
        <div className="flex-1 flex flex-col min-h-[70vh] aspect:[] ">
          <div className="flex-1 ">
            <StoryItemViewer
              story={() => story}
              forward={() => {}}
              ind={0}
              className=" flex-1"
            />
          </div>
          <LikeMain
            col_="stories"
            data={story}
            className="ml-[5%] pt-2 mb-2 text-white min-h-[30px] "
            likeActiveStyle=" text-white bg-indigo-300 p-1 text-white dark:text-white"
            loveActiveStyle="text-white bg-pink-300 p-1 pt-2 dark:text-white "
            likeClass="text-white hover:animation-bounce"
            loveClass="text-white hover:animation-bounce"
          />
        </div>
        <StoryComments story={() => state.storyItem} ind={0} total={1} />
      </div>
    </div>
  );
};

export default ExploreStoryItem;
