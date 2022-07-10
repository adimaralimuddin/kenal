import { toolArrayRemove, toolArrayUnion } from "./toolArrayDb";
import useNotifs from "./useNotifs";

export default function useReaction() {
  const { addNotif } = useNotifs();
  async function like(docId, authId, likes, col_, docUserId) {
    // console.log({ docId, authId, likes, col_, docUserId });
    if (likes?.find((i) => i == authId)) {
      toolArrayRemove(col_, docId, "likes", authId);
      if (col_ == "comments") {
        console.log("unlike comment");
        addNotif(docUserId, authId, "unlike-comment", docId);
      } else if (col_ == "replies") {
        addNotif(docUserId, authId, "unlike-reply", docId);
      } else {
        addNotif(docUserId, authId, "unlike-post", docId);
      }
    } else {
      toolArrayUnion(col_, docId, "likes", authId);
      if (col_ == "comments") {
        console.log("like comment");
        addNotif(docUserId, authId, "like-comment", docId);
      } else if (col_ == "replies") {
        addNotif(docUserId, authId, "like-reply", docId);
      } else {
        addNotif(docUserId, authId, "like-post", docId);
      }
    }
  }

  async function love(docId, authId, loves, col_, docUserId) {
    if (loves?.find((i) => i == authId)) {
      toolArrayRemove(col_, docId, "loves", authId);
      if (col_ == "comments") {
        addNotif(docUserId, authId, "unlove-comment", docId);
      } else if (col_ == "replies") {
        addNotif(docUserId, authId, "unlove-reply", docId);
      } else {
        addNotif(docUserId, authId, "unlove-post", docId);
      }
    } else {
      toolArrayUnion(col_, docId, "loves", authId);
      if (col_ == "comments") {
        addNotif(docUserId, authId, "love-comment", docId);
      } else if (col_ == "replies") {
        addNotif(docUserId, authId, "love-reply", docId);
      } else {
        addNotif(docUserId, authId, "love-post", docId);
      }
    }
  }

  return {
    like,
    love,
  };
}
