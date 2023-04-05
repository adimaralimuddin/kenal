import {
  arrayRemove,
  arrayUnion,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import create from "zustand";
import { db } from "../../firebase.config";
import ToolSnapToDocs from "../relations/toolSnapToDocs";
import toolUpdatedoc from "../toolUpdateDoc";
import useNotifs from "../useNotifs";
import useUser from "../useUser";

export const MessageRequestStore = create((set) => ({ set }));
const UseMessageRequest = () => {
  const store = MessageRequestStore();
  const { set } = store;
  const { user } = useUser();
  const { notify, updateNotif } = useNotifs();

  function listenRequest() {
    if (!user) return;
    const q = query(
      collection(db, "notifs"),
      where("to", "==", user.uid),
      where("type", "==", "message")
    );
    return onSnapshot(q, (snap) => {
      const notifs = ToolSnapToDocs(snap);
      set({ notifs });
    });
  }

  async function acceptRequest({ id, from, docId, type, notif }, callback) {
    const result = await toolUpdatedoc("converse", docId, {
      requestedMembers: arrayRemove(user.uid),
      members: arrayUnion(user.uid),
    });
    // addNotif(from, user.uid, "messagerequest", converseId);
    updateNotif({
      notifId: id,
      data: {
        confirmed: true,
        accepted: true,
        seen: true,
      },
    });
    notify({
      to: from,
      from: user.uid,
      docId,
      msg: "accepted your group chat request.",
      notif,
      type,
      subtype: "accepted",
      id: docId + "message-accepted",
    });
    callback && callback?.(result);
  }

  async function declineRequest({ id, from, docId, notif, type }, callback) {
    const result = await toolUpdatedoc("converse", docId, {
      requestedMembers: arrayRemove(user.uid),
    });
    updateNotif({
      notifId: id,
      data: {
        confirmed: true,
        accepted: false,
        seen: true,
      },
    });

    notify({
      to: from,
      from: user.uid,
      docId,
      msg: "declined your group chat request.",
      notif,
      type,
      subtype: "declined",
      id: docId + "message-declined",
    });

    callback && callback?.(result);
  }

  const getNotifBadge = () => {
    return store?.notifs?.filter((n) => n?.seen === false)?.length;
  };
  return {
    ...store,
    listenRequest,
    acceptRequest,
    declineRequest,
    getNotifBadge,
  };
};

export default UseMessageRequest;
