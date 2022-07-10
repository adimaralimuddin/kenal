import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "../firebase.config";
import create from "zustand";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import toolGetDoc from "./toolGetDoc";
import toolUpdatedoc from "./toolUpdateDoc";
const store_ = create((set) => ({ set: (data) => set(data) }));

export default function useUser() {
  const store = store_();
  const { set, user } = store;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      set({ user });
      if (user) {
        toolUpdatedoc("users", user?.uid, {
          online: true,
          onlineAt: new Date(),
        });
      }
    });
    return () => unsub();
  }, []);

  async function logout() {
    await toolUpdatedoc("users", user?.uid, {
      online: false,
      offlineAt: new Date(),
    });
    signOut(auth);
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const x = await signInWithPopup(auth, provider);
    const user = x?.user;
    if (user) {
      const y = await getDoc(doc(db, "users", user?.uid));
      if (!y?._document) {
        const user_ = await setDoc(doc(db, "users", user?.uid), {
          userName: user?.displayName,
          avatar: user?.photoURL,
          timestamp: serverTimestamp(),
        });
        const profile = await setDoc(doc(db, "profile", user?.uid), {
          ...user?.providerData?.[0],
          timestamp: serverTimestamp(),
        });
        const relations = await setDoc(doc(db, "relations", user?.uid), {});
      }
    }
  }

  async function getUser(userId, setter) {
    const user_ = await toolGetDoc("users", userId);
    setter(user_);
    return user_;
  }

  return { ...store, logout, loginWithGoogle, getUser };
}
