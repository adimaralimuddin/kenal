import { toolArrayRemove, toolArrayUnion } from "./toolArrayDb";
import useNotifs from "./useNotifs";

export default function useReaction() {
  const { notify } = useNotifs();

  async function like(
    { docId, authId, likes, col_, docUserId, postId, text },
    noNotif
  ) {
    const x = { docId, authId, likes, col_, docUserId, postId, text };
    async function createLikeNotif(type, subtype) {
      if (docUserId !== authId && !noNotif) {
        await notify({
          docId: postId,
          to: docUserId,
          from: authId,
          subtype,
          type,
          actionId: docId,
          notif: "react",
          text,
          id: docId + "like",
        });
      }
    }

    if (likes?.find((i) => i == authId)) {
      toolArrayRemove(col_, docId, "likes", authId);
      if (col_ == "comments") {
        createLikeNotif("comment", "unlike");
      } else if (col_ == "storyComments") {
        createLikeNotif("storyComments", "unlike");
      } else if (col_ == "replies") {
        createLikeNotif("reply", "unlike");
      } else if (col_ == "stories") {
        createLikeNotif("story", "unlike");
      } else {
        createLikeNotif("post", "unlike");
      }
    } else {
      toolArrayUnion(col_, docId, "likes", authId);
      if (col_ == "comments") {
        createLikeNotif("comment", "like");
      } else if (col_ == "storyComments") {
        createLikeNotif("storyComments", "like");
      } else if (col_ == "replies") {
        createLikeNotif("reply", "like");
      } else if (col_ == "stories") {
        createLikeNotif("story", "like");
      } else {
        createLikeNotif("post", "like");
      }
    }
  }

  async function love(
    { docId, authId, loves, col_, docUserId, postId, text },
    noNotif
  ) {
    function createLoveNotif(type, subtype) {
      if (docUserId !== authId && !noNotif) {
        notify({
          docId: postId,
          to: docUserId,
          from: authId,
          subtype,
          type,
          actionId: docId,
          notif: "react",
          text,
          id: docId + "love",
        });
      }
    }
    if (loves?.find((i) => i == authId)) {
      toolArrayRemove(col_, docId, "loves", authId);
      if (col_ == "comments") {
        createLoveNotif("comment", "unlove");
      } else if (col_ == "storyComments") {
        createLoveNotif("storyComments", "unlove");
      } else if (col_ == "replies") {
        createLoveNotif("reply", "unlove");
      } else if (col_ == "stories") {
        createLoveNotif("story", "unlove");
      } else {
        createLoveNotif("post", "unlove");
      }
    } else {
      toolArrayUnion(col_, docId, "loves", authId);
      if (col_ == "comments") {
        createLoveNotif("comment", "love");
      } else if (col_ == "storyComments") {
        createLoveNotif("storyComments", "love");
      } else if (col_ == "replies") {
        createLoveNotif("reply", "love");
      } else if (col_ == "stories") {
        createLoveNotif("story", "love");
      } else {
        createLoveNotif("post", "love");
      }
    }
  }

  return {
    like,
    love,
  };
}
