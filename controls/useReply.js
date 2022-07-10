import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import toolPostAdder from "./toolPostAdder";
import toolRemoveDoc from "./toolRemoveDoc";
import toolRemoveFile from "./toolRemoveFile";
import toolUpdateDoc from "./toolUpdateDoc";
import useNotifs from "./useNotifs";
import useUser from "./useUser";

export default function useReply(commentId, postId) {
  const { user } = useUser();
  const [replies, setReplies] = useState([]);
  const { addNotif } = useNotifs();

  useEffect(() => {
    if (!commentId) return;
    const q = query(
      collection(db, "replies"),
      where("commentId", "==", commentId),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snap) => {
      setReplies(snap?.docs?.map((d) => ({ ...d.data(), id: d.id })));
    });
  }, [commentId]);

  async function addReply(data_, clear) {
    const data = {
      commentId,
      postId,
      userId: user?.uid,
      body: data_?.body,
    };
    if (data_?.replyTo) {
      data.replyTo = data_.replyTo;
    }

    await toolPostAdder(data, data_?.imgs, "replies", () => {
      clear();
    });
    addNotif(
      data_.commentUserId,
      user.uid,
      "reply-comment",
      data_?.postId,
      data_?.commentId
    );

    if (data?.replyTo) {
      console.log("have to mentionsed ", data?.replyTo);
      addNotif(
        data?.replyTo?.[0],
        user?.uid,
        "mention",
        data_?.postId,
        data_?.commentId
      );
    }
  }

  async function removeReply(id, imgs) {
    toolRemoveDoc("replies", id);
    if (imgs) {
      imgs?.map((img) => {
        toolRemoveFile(`files/replies/${img?.ind}`);
      });
    }
  }

  async function updateReply(prev, body, images, docId) {
    await toolUpdateDoc("replies", docId, { prev, body, images });
  }

  return {
    addReply,
    replies,
    removeReply,
    updateReply,
  };
}
