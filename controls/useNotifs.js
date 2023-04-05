import {
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
import create from "zustand";
import { db } from "../firebase.config";
import toolRemoveDoc from "./toolRemoveDoc";
import toolUpdatedoc from "./toolUpdateDoc";
import useSettings from "./useSettings";
import useUser from "./useUser";

export const NotifStore = create((set) => ({ set }));
export default function useNotifs() {
  const { getUserSettings } = useSettings();
  const store = NotifStore();
  const { user } = useUser();

  function listen(caller) {
    const userId = user?.uid;
    if (!userId) return;
    const q = query(
      collection(db, "notifs"),
      where("to", "==", userId),
      // where(),
      orderBy("timestamp", "desc")
    );
    return onSnapshot(q, (snap) => {
      const notifs = snap?.docs?.map((d) => ({ ...d.data(), id: d.id }));
      store.set({ notifs });
      caller?.(notifs);
    });
  }

  async function notify({
    to,
    from,
    type,
    subtype,
    docId,
    msg = "",
    notif,
    ...others
  }) {
    const userSettings = await getUserSettings(to);
    const notifSetting = "notif" + notif + type;
    if (
      userSettings?.[notifSetting] &&
      !userSettings?.[notifSetting + "list"]?.find((p) => p == from)
    ) {
      const data = { to, from, type, docId, msg, notif, subtype };

      const payLoad = {
        ...others,
        ...data,
        lists: arrayUnion(from),
        seen: false,
        timestamp: serverTimestamp(),
      };
      if (!payLoad?.id) {
        payLoad.id = docId + type;
      }
      console.log("playload", payLoad);

      const result = await setDoc(doc(db, "notifs", payLoad.id), payLoad, {
        merge: true,
      });
    } else {
      console.log("notif post is blocked");
    }
  }

  function updateNotif({ notifId, data }) {
    toolUpdatedoc("notifs", notifId, data, (done) => {
      console.log("notif updated");
    });
  }

  function seen(docId) {
    toolUpdatedoc("notifs", docId, { seen: true });
  }

  function getNotifBadge() {
    return store?.notifs?.filter?.((p) => !p.seen)?.length;
  }

  async function deleteNotif(notifId) {
    const deletedResult = await toolRemoveDoc("notifs", notifId);
    return deletedResult;
  }

  return {
    ...store,
    listen,
    seen,
    notify,
    getNotifBadge,
    deleteNotif,
    updateNotif,
  };
}
