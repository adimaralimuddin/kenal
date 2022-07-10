import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import useSettings from "./useSettings";
import toolAdddoc from "./toolAddDoc";
import toolUpdatedoc from "./toolUpdateDoc";
import toolGetDoc from "./toolGetDoc";

export default function useNotifs() {
  const { settings, getUserSettings } = useSettings();
  function listen(userId, caller) {
    if (!userId) return;
    const q = query(
      collection(db, "notifs"),
      where("to", "==", userId),
      orderBy("timestamp", "desc")
    );
    return onSnapshot(q, (snap) => {
      const notifs = snap?.docs?.map((d) => ({ ...d.data(), id: d.id }));
      // console.log("snpas ", notifs);
      caller?.(notifs);
    });
  }

  async function addNotif(to, from, type, docId, ref) {
    const data = { to, from, type, docId, url: "post" };
    if (ref) {
      data.ref = ref;
    }
    switch (type) {
      case "sendReq":
        data.message = "you have a new friend request";
        break;
      case "like-post": // post
        data.message = "liked your posts";
        data.notif = "notifreactpost";
        break;
      case "unlike-post":
        data.message = "disliked your posts";
        data.notif = "notifreactpost";
        break;
      case "love-post":
        data.message = "loved your posts";
        data.notif = "notifreactpost";
        break;
      case "unlove-post":
        data.message = "unloved your posts";
        data.notif = "notifreactpost";
        break;

      case "comment-post":
        data.message = "commented on your post";
        data.notif = "notifcommentpost";
        break;
      //-------------------------------------------------- comment
      case "like-comment":
        data.message = "liked your comment";
        data.notif = "notifreactcomment";
        break;
      case "unlike-comment":
        data.message = "unliked your comment";
        data.notif = "notifreactcomment";
        break;
      case "love-comment":
        data.message = "loved your comment";
        data.notif = "notifreactcomment";
        break;
      case "unlove-comment":
        data.message = "unloved your comment";
        data.notif = "notifreactcomment";
        break;
      case "reply-comment":
        data.message = "replied on your comment";
        data.notif = "notifreplycomment";
        break;
      //-------------------------------------------------- reply
      case "like-reply":
        data.message = "liked your reply";
        data.notif = "notifreactreply";
        break;
      case "unlike-reply":
        data.message = "unliked your reply";
        data.notif = "notifreactreply";
        break;
      case "love-reply":
        data.message = "loved your reply";
        data.notif = "notifreactreply";
        break;
      case "unlove-reply":
        data.message = "unloved your reply";
        data.notif = "notifreactreply";
        break;
      //--------------------------------------------------mention
      case "mention":
        data.message = "mentioned you on a reply";
        data.notif = "notifmention";
        data.post = "user";
        break;
      //-------------------------------------------------relations
      case "follow":
        data.message = "started following you";
        data.notif = "notiffollow";
        data.post = "user";
        break;
      case "unfollow":
        data.message = "just unfollowed you";
        data.notif = "notifunfollow";
        data.post = "user";
        break;
      default:
        break;
    }
    console.log({ data });
    const userSettings = await getUserSettings(to);
    if (
      userSettings?.[data?.notif] &&
      !userSettings?.[data?.notif + "list"]?.find((p) => p == from)
    ) {
      const id = docId + type.replace("-", "");
      const gotNotif = await toolGetDoc("notifs", id);
      const payLoad = {
        ...data,
        lists: arrayUnion(from),
        seen: false,
        timestamp: serverTimestamp(),
      };

      setDoc(doc(db, "notifs", id), payLoad, { merge: true });
    } else {
      console.log("notif post is blocked");
    }
  }

  function seen(docId) {
    toolUpdatedoc("notifs", docId, { seen: true });
  }

  return {
    addNotif,
    listen,
    seen,
  };
}
