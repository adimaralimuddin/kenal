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
import useSettings from "./useSettings";
import useUser from "./useUser";

export default function useReply(commentId, postId) {
  const { user } = useUser();
  const [replies, setReplies] = useState([]);
  const { notify } = useNotifs();
  const { settings, getUserSettings } = useSettings();

  useEffect(() => {
    const blockedUsers = settings?.blockedusers;
    if (!commentId || !blockedUsers) return;
    const q = query(
      collection(db, "replies"),
      where("commentId", "==", commentId),
      where(
        "userId",
        "not-in",
        blockedUsers?.length != 0 ? blockedUsers : ["xxxxxxxxxxxxxxxxxxxxx"]
      ),
      orderBy("userId", "asc"),
      orderBy("timestamp", "asc")
    );
    onSnapshot(q, (snap) => {
      setReplies(snap?.docs?.map((d) => ({ ...d.data(), id: d.id })));
    });
  }, [commentId, settings]);

  async function addReply(data_, clear) {
    const data = {
      commentId,
      postId: data_?.postId,
      userId: user?.uid,
      body: data_?.body,
      postUserId: data_?.postUserId,
      commentUserId: data_?.commentUserId,
    };
    if (data_?.replyTo) {
      data.replyTo = data_.replyTo;
    }

    const addedReply = await toolPostAdder(data, data_?.imgs, "replies", () => {
      clear();
    });

    if (data_?.commentUserId !== user?.uid) {
      notify({
        to: data_?.commentUserId,
        from: user.uid,
        docId: data_?.postId,
        notif: "reply",
        type: "comment",
        subtype: "reply",
        msg: "reply on your comment.",
        actionId: data_?.commentId,
        text: data?.body,
        id: addedReply.id,
      });
    }

    if (data?.replyTo) {
      notify({
        to: data?.replyTo?.[0],
        from: user.uid,
        docId: data_?.postId,
        notif: "reply",
        type: "reply",
        subtype: "reply",
        msg: "reply on your reply.",
        actionId: data_?.commentId,
        text: data?.body,
        id: addedReply.id,
      });
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

  async function checkReplyPrivacy(data) {
    let ret = true;
    const userId = data?.userId;
    const userSettings = await getUserSettings(userId);
    const blockedUsers = userSettings?.blockedusers;
    if (blockedUsers?.find((p) => p == user?.uid)) {
      ret = false;
    }
    return ret;
  }

  return {
    addReply,
    replies,
    removeReply,
    updateReply,
    checkReplyPrivacy,
  };
}
