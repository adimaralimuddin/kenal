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
import useUser from "./useUser";

export default function useComment(postId, hookComments = () => {}) {
  const { user } = useUser();
  const [comments, setComments] = useState();
  const { addNotif } = useNotifs();

  useEffect(() => {
    if (!postId) return;
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snap) => {
      const comments_ = snap?.docs?.map((d) => ({ ...d.data(), id: d.id }));
      setComments(comments_);
      hookComments(comments_);
    });
  }, [postId]);

  async function addComment(data_, clear) {
    const data = {
      postId,
      userId: user?.uid,
      body: data_?.body,
      status: "public",
    };
    // console.log(data_);
    // console.log(data);
    await toolPostAdder(data, data_?.imgs, "comments", () => {
      clear();
    });
    addNotif(data_?.postUserId, user?.uid, "comment-post", data_?.postId);
  }

  const removeComment = async (id, imgs) => {
    toolRemoveDoc("comments", id);
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

  return {
    comments,
    addComment,
    removeComment,
    updateComment,
  };
}
