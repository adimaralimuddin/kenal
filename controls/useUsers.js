import { collection, documentId, getDocs, where } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase.config";
import create from "zustand";

const store_ = create((set) => ({ set: (data) => set(data) }));

export default function useUsers() {
  const store = store_();
  const { set } = store;

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

  return {
    ...store,
    // getUsersLists,
  };
}
