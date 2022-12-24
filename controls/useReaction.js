import { toolArrayRemove, toolArrayUnion } from "./toolArrayDb";
import useNotifs from "./useNotifs";

export default function useReaction() {
  const { addNotif } = useNotifs();
  async function like(docId, authId, likes, col_, docUserId) {
    console.log("to ", docUserId);
    function preAddNotif(field) {
      if (docUserId !== authId) {
        addNotif(docUserId, authId, field, docId);
      }
    }

    if (likes?.find((i) => i == authId)) {
      toolArrayRemove(col_, docId, "likes", authId);
      if (col_ == "comments") {
        preAddNotif("unlike-comment");
      } else if (col_ == "replies") {
        preAddNotif("unlike-reply");
      } else {
        preAddNotif("unlike-post");
      }
    } else {
      toolArrayUnion(col_, docId, "likes", authId);
      if (col_ == "comments") {
        preAddNotif("like-comment");
      } else if (col_ == "replies") {
        preAddNotif("like-reply");
      } else {
        preAddNotif("like-post");
      }
    }
  }

  async function love(docId, authId, loves, col_, docUserId) {
    console.log("to ", docUserId);

    function preAddNotif(field) {
      if (docUserId !== authId) {
        addNotif(docUserId, authId, field, docId);
      }
    }
    if (loves?.find((i) => i == authId)) {
      toolArrayRemove(col_, docId, "loves", authId);
      if (col_ == "comments") {
        preAddNotif("unlove-comment");
      } else if (col_ == "replies") {
        preAddNotif("unlove-reply");
      } else {
        preAddNotif("unlove-post");
      }
    } else {
      toolArrayUnion(col_, docId, "loves", authId);
      if (col_ == "comments") {
        preAddNotif("love-comment");
      } else if (col_ == "replies") {
        preAddNotif("love-reply");
      } else {
        preAddNotif("love-post");
      }
    }
  }

  return {
    like,
    love,
  };
}
