import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import UseExplorePosts from "../../../controls/explore/useExplorePosts";
import PostItem from "../../post/PostItem";
const ExplorePostItem = () => {
  const router = useRouter();
  const { query } = router;
  const postId = query?.postId;
  const actionId = query?.actionId;
  const state = UseExplorePosts();
  const commentRef = useRef(null);

  useEffect(() => {
    state.listenPostItem(postId);
  }, [postId]);

  useEffect(() => {
    const ret = setTimeout(() => {
      if (commentRef.current && postId && state.post && actionId) {
        commentRef.current?.click();
        console.log("goooooo");
      }
    }, [1000]);

    return () => {
      clearTimeout(ret);
    };
  }, [postId, state.post, actionId]);

  return (
    <div>
      <a ref={commentRef} href={"#" + actionId}></a>
      <PostItem data={state.post} />
    </div>
  );
};

export default ExplorePostItem;
