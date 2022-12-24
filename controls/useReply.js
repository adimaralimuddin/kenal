import { data } from "autoprefixer";
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
  const { addNotif } = useNotifs();
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
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snap) => {
      setReplies(snap?.docs?.map((d) => ({ ...d.data(), id: d.id })));
    });
  }, [commentId, settings]);

  async function addReply(data_, clear) {
    console.log("reps data = ", data_);
    const data = {
      commentId,
      postId,
      userId: user?.uid,
      body: data_?.body,
      postUserId: data_?.postUserId,
      commentUserId: data_?.commentUserId,
    };
    if (data_?.replyTo) {
      data.replyTo = data_.replyTo;
    }

    console.log("rep data = ", data);

    await toolPostAdder(data, data_?.imgs, "replies", () => {
      clear();
    });

    if (data_?.commentUserId !== user?.uid) {
      addNotif(
        data_.commentUserId,
        user.uid,
        "reply-comment",
        data_?.postId,
        data_?.commentId
      );
    }

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
