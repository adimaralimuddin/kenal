import { toolArrayRemove, toolArrayUnion } from "./toolArrayDb";
import useNotifs from "./useNotifs";

export default function useReaction() {
  const { addNotif, notify } = useNotifs();

  // docId, authId, likes, col_, docUserId
  async function like({ docId, authId, likes, col_, docUserId, postId, text }) {
    function createLikeNotif(type, subtype) {
      if (docUserId !== authId) {
        notify({
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
      } else if (col_ == "replies") {
        createLikeNotif("reply", "unlike");
      } else {
        createLikeNotif("post", "unlike");
      }
    } else {
      toolArrayUnion(col_, docId, "likes", authId);
      if (col_ == "comments") {
        createLikeNotif("comment", "like");
      } else if (col_ == "replies") {
        createLikeNotif("reply", "like");
      } else {
        createLikeNotif("post", "like");
      }
    }
  }

  // docId, authId, loves, col_, docUserId
  async function love({ docId, authId, loves, col_, docUserId, postId, text }) {
    function createLoveNotif(type, subtype) {
      console.log("loves", loves);
      console.log(
        "isloved",
        loves?.find((i) => i == authId)
      );
      if (docUserId !== authId) {
        // addNotif(docUserId, authId, subtype, docId);
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
      } else if (col_ == "replies") {
        createLoveNotif("reply", "unlove");
      } else {
        createLoveNotif("post", "unlove");
      }
    } else {
      toolArrayUnion(col_, docId, "loves", authId);
      if (col_ == "comments") {
        createLoveNotif("comment", "love");
      } else if (col_ == "replies") {
        createLoveNotif("reply", "love");
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
