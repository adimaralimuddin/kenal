import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import toolGetDocs from "./toolGetDocs";
import toolPostAdder from "./toolPostAdder";
import toolRemoveDoc from "./toolRemoveDoc";
import toolRemoveFile from "./toolRemoveFile";
import toolUpdatedoc from "./toolUpdateDoc";
import useNotifs from "./useNotifs";
import useRelations from "./useRelations";
import useSettings from "./useSettings";
import useUser from "./useUser";

export default function useComment(
  { postId, postUserId } = {},
  hookComments = () => {}
) {
  const { user } = useUser();
  const [comments, setComments] = useState();
  const { addNotif, notify } = useNotifs();
  const { isFollowings } = useRelations();
  const { settings, getUserSettings } = useSettings();

  useEffect(() => {
    const blockedUsers = settings?.blockedusers;
    if (!postId || !blockedUsers) return;
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      where(
        "userId",
        "not-in",
        blockedUsers?.length != 0 ? blockedUsers : ["xxxxxxxxxxxxxxx"]
      ),
      orderBy("userId", "desc"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snap) => {
      const comments_ = snap?.docs?.map((d) => ({ ...d.data(), id: d.id }));
      setComments(comments_);
      hookComments(comments_);
    });
  }, [postId, settings]);

  async function addComment(data_, caller) {
    const data = {
      postId,
      postUserId,
      userId: user?.uid,
      body: data_?.body,
      status: "public",
    };
    const addedComment = await toolPostAdder(
      data,
      data_?.imgs,
      "comments",
      caller
    );
    if (postUserId !== user?.uid) {
      notify({
        to: data_?.postUserId,
        from: user?.uid,
        docId: data_?.postId,
        notif: "comment",
        type: "post",
        subtype: "comment",
        msg: "comment on your post.",
        actionId: addedComment.id,
        text: data?.body,
        id: data_?.postId + addedComment.id,
      });
    }
  }

  const removeComment = async (id, imgs, caller) => {
    toolRemoveDoc("comments", id, caller);
    if (imgs) {
      imgs?.map((img) => {
        toolRemoveFile(`files/comments/${id}/${img?.ind}`);
      });
    }
    const reps = await toolGetDocs("replies", where("commentId", "==", id));
    reps?.map((rep) => {
      toolRemoveDoc("replies", rep?.id);
      if (rep?.images) {
        rep?.images?.map((img) => {
          toolRemoveFile(`files/replies/${rep?.id}/${img?.ind}`);
        });
      }
    });
  };

  const updateComment = async (prev, body, images, docId) =>
    toolUpdatedoc("comments", docId, { prev, body, images });

  function checkCommentPrivacy(postUserId, userSettings, comment) {
    if (postUserId == user?.uid) return true;
    switch (userSettings?.commentPost) {
      case "Public":
        return true;
      case "Followers":
        if (isFollowings(undefined, postUserId)) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }

  async function checkCommentItemPrivacy(comment) {
    let ret = true;
    const { userId } = comment;
    const userSettings = await getUserSettings(userId);
    const blockedUsers = userSettings?.blockedusers;
    if (blockedUsers?.find((p) => p == user?.uid)) {
      ret = false;
    }
    return ret;
  }

  return {
    comments,
    addComment,
    removeComment,
    updateComment,
    checkCommentPrivacy,
    checkCommentItemPrivacy,
  };
}
