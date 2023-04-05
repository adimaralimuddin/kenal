import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import create from "zustand";
import toolPostAdder from "../controls/toolPostAdder";
import { db } from "../firebase.config";
import ToolSnapToDocs from "./relations/toolSnapToDocs";
import toolGetDoc from "./toolGetDoc";
import toolGetDocs from "./toolGetDocs";
import useSettings from "./useSettings";
import useUser from "./useUser";
const store_ = create((set) => ({
  convers: [],
  minimized: [],
  opened: [],
  converse: [],
  set,
}));

export default function useChat() {
  const store = store_();
  const { set } = store;
  const { getUserSettings, settings } = useSettings();
  const { user } = useUser();

  function listenConverseCat(converse, caller, setter = true) {
    if (!user || !user) return;
    const converseId = converse?.id;
    const q = query(
      collection(db, "messages"),
      where("converseId", "==", converseId),
      orderBy("timestamp", "asc")
    );
    const ret = onSnapshot(q, (snap) => {
      const chats = ToolSnapToDocs(snap);
      caller && caller(chats);
      {
        setter && set({ [converseId]: chats });
      }
    });
    return ret;
  }

  function listen(conver, setter) {
    const q = query(
      collection(db, "chats"),
      where("converId", "in", [conver?.[1] + conver?.[0], conver?.join("")]),
      orderBy("timestamp", "asc")
    );

    const ret = onSnapshot(q, (snap) => {
      setter
        ? setter?.(snap?.docs?.map((d) => ({ ...d.data(), id: d.id })))
        : null;
    });
    return ret;
  }

  function listenChatNotif(fromUserId, caller) {
    if (!fromUserId) return;
    const q = query(
      collection(db, "notifs"),
      where("to", "==", user?.uid),
      where("from", "==", fromUserId),
      where("seen", "==", false),
      where("type", "==", "chat"),
      orderBy("timestamp", "desc")
    );
    return onSnapshot(q, (snap) => {
      const notifs = snap?.docs?.map((d) => ({ ...d.data(), id: d.id }));
      caller?.(notifs);
    });
  }

  function openMiniConverse(converse) {
    set((p) => {
      let n = p?.convers?.filter((c) => c?.id != converse?.id);
      n.splice(0, 0, {
        converse,
        conver: converse.members,
        open: true,
        prior: true,
        minimized: false,
        id: converse.id,
      });
      return { convers: n };
    });
  }

  function openConver(conver) {
    console.log("open conver", conver);
    set((p) => {
      let n = p?.convers?.filter((c) => c?.id != conver?.toString());
      n.splice(0, 0, {
        conver,
        open: true,
        prior: true,
        minimized: false,
        id: conver.toString(),
      });
      console.log(n);
      return { convers: n };
    });
  }

  async function addChat({ data, imgs }, callback) {
    const ret = await toolPostAdder(data, imgs, "chats");
    callback?.(data, imgs);
    return ret;
  }

  function removeConver(converse) {
    set((p) => ({
      [converse?.id]: [],
      convers: p.convers.filter((c) => c.id != converse?.id),
    }));
  }

  function closeConver(converse) {
    set((p) => ({
      convers: p.convers.map((c) => {
        if (c.id == converse.id) {
          c.open = false;
        }
        return c;
      }),
    }));
  }

  function minimizeConver(converse, action = true) {
    set((p) => ({
      convers: p.convers.map((c) => {
        if (c.id == converse?.id) {
          c.minimized = action;
        }
        return c;
      }),
    }));
  }

  async function checkChatPrivacy(conver) {
    let ret = true;
    const userId = conver?.filter((p) => p !== user?.uid)?.[0];
    if (!userId) return true;
    const userSettings = await getUserSettings(userId);
    const blockedUsers = userSettings?.blockedusers;
    const myBlockedUsers = settings?.blockedusers;
    const blockedChats = userSettings?.blockedchats;

    if (blockedUsers?.find((p) => p == user?.uid)) {
      ret = false;
    }
    if (myBlockedUsers?.find((p) => p == userId)) {
      ret = false;
    }
    if (blockedChats?.find((p) => p == userId)) {
      ret = false;
    }
    return ret;
  }

  return {
    ...store,
    listen,
    openConver,
    addChat,
    closeConver,
    minimizeConver,
    removeConver,
    checkChatPrivacy,
    listenChatNotif,
    listenConverseCat,
    openMiniConverse,
  };
}
