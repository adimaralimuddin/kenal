import { collection, documentId, getDocs, where } from "firebase/firestore";
import { useEffect } from "react";
import create from "zustand";
import { db } from "../firebase.config";
import toolGetDocs from "./toolGetDocs";
import useSettings from "./useSettings";
import useUser from "./useUser";

const store_ = create((set) => ({ set: (data) => set(data) }));

export default function useUsers() {
  const store = store_();
  const { set } = store;
  const { user } = useUser();
  const settings = useSettings();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const x = await getDocs(collection(db, "users"));
    const users = x.docs?.map((d) => ({ ...d.data(), id: d.id }));
    set({ users });
  }

  // async function getUsersLists(usersLists) {
  //     const snap = await getDocs(collection(db, 'users'), where(documentId(), 'in', usersLists))
  //     return snap?.empty ? [] : snap?.docs?.map(d=>({...d?.data(),id:d?.id}))
  // }

  async function getFriends(callback) {
    const mySettings = await settings.getUserSettings(user?.uid);
    const blockedUsers = mySettings.blockedusers || [];
    const filteredUsers = [...blockedUsers, user?.uid];
    const friends = await toolGetDocs(
      "profile",
      where(documentId(), "not-in", filteredUsers)
    );
    callback && callback?.(friends);
    return friends;
  }

  async function getPeople(callback) {
    const mySettings = await settings.getUserSettings(user?.uid);
    const blockedUsers = mySettings.blockedusers || [];
    const filteredUsers = [...blockedUsers, user?.uid];
    const friends = await toolGetDocs(
      "profile",
      where(documentId(), "not-in", filteredUsers)
    );
    callback && callback?.(friends);
    return friends;
  }

  return {
    ...store,
    getFriends,
    getPeople,
    // getUsersLists,
  };
}
