import useUser from "./useUser";
import toolUpdateDoc from "./toolUpdateDoc";
import toolGetDocs from "./toolGetDocs";
import {
  arrayRemove,
  arrayUnion,
  doc,
  documentId,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import create from "zustand";
import toolGetDoc from "./toolGetDoc";

const store_ = create((set) => ({
  settings: null,
  set: (data) => set(data),
}));
export default function useSettings() {
  const { user } = useUser();
  const store = store_();
  const { set, settings, users } = store;

  function listen(userId = user?.uid, passer) {
    if (userId) {
      return onSnapshot(doc(db, "settings", userId), (doc) => {
        set({ settings: doc?.data() });
        passer?.(doc?.data());
      });
    } else {
      return () => {};
    }
  }

  function listenUserSettings(userId, caller) {
    if (userId) {
      return onSnapshot(doc(db, "settings", userId), (doc) => {
        caller?.(doc?.data());
      });
    } else {
      return () => {};
    }
  }

  async function getUserSettings(userId) {
    return await toolGetDoc("settings", userId);
  }

  async function initUsers() {
    const users = await toolGetDocs("users");
    set({ users });
  }

  function update(field, value) {
    toolUpdateDoc("settings", user?.uid, { [field]: value });
  }

  async function block(field, userId) {
    await toolUpdateDoc("settings", user?.uid, {
      [field]: arrayUnion(userId),
    });
  }

  function unBlock(field, docId) {
    toolUpdateDoc("settings", user?.uid, {
      [field]: arrayRemove(docId),
    });
  }

  return {
    ...store,
    update,
    listen,
    block,
    unBlock,
    initUsers,
    getUserSettings,
    listenUserSettings,
  };
}
