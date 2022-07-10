import {
  collection,
  doc,
  documentId,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import toolPostAdder from "../controls/toolPostAdder";

import create from "zustand";
const store_ = create((set) => ({
  convers: [],
  minimized: [],
  opened: [],
  set: (data) => set(data),
}));

export default function useChat() {
  const store = store_();
  const { set, convers, minimized, opened } = store;

  async function initConver(authId, userId, caller = () => {}) {
    // const converQuery_ = query(
    //   collection(db, "convers"),
    //   where(documentId(), "in", [authId + userId, userId + authId])
    // );
    // const conver = await getDocs(converQuery_); // get if conver existed
    // const chatQuery_ = query(
    //   // query for all conver's chat
    //   collection(db, "chats"),
    //   where("converId", "in", [authId + userId, userId + authId])
    // );
    // if (conver?.empty) {
    //   // create new conver if unexisted
    //   const newCon = await setDoc(doc(db, "convers", authId + userId), {});
    //   return onSnapshot(chatQuery_, (snap) => {
    //     caller(snap?.docs?.map((d) => ({ ...d.data(), id: d.id })));
    //   });
    // } else {
    //   return onSnapshot(chatQuery_, (snap) => {
    //     caller(snap?.docs?.map((d) => ({ ...d.data(), id: d.id })));
    //   });
    // }
  }

  function openConver(conver) {
    set((p) => {
      let n = p?.convers?.filter((c) => c?.id != conver?.toString());
      n.splice(0, 0, {
        conver,
        open: true,
        prior: true,
        minimized: false,
        id: conver.toString(),
      });
      return { convers: n };
    });
  }

  async function addChat({ data, imgs }, clear) {
    console.log(data);
    await toolPostAdder(data, imgs, "chats");
    clear();
  }

  function removeConver(conver) {
    set((p) => ({
      convers: p.convers.filter((c) => c.conver != conver),
    }));
  }

  function closeConver(conver) {
    set((p) => ({
      convers: p.convers.map((c) => {
        if (c.id == conver.toString()) {
          c.open = false;
        }
        return c;
      }),
    }));
  }

  function minimizeConver(conver, action = true) {
    set((p) => ({
      convers: p.convers.map((c) => {
        if (c.id == conver?.toString()) {
          c.minimized = action;
        }
        return c;
      }),
    }));
  }

  return {
    ...store,
    openConver,
    initConver,
    addChat,
    closeConver,
    minimizeConver,
    removeConver,
  };
}
