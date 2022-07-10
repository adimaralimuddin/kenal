import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import create from "zustand";
import { db } from "../firebase.config";
import toolPostAdder from "./toolPostAdder";
import useUser from "./useUser";
import toolRemoveDoc from "./toolRemoveDoc";

const store_ = create((set) => create({ set: (data) => set(data) }));
export default function useStory() {
  const { user } = useUser();
  const store = store_();
  const { set } = store;

  useEffect(() => {
    const q = query(collection(db, "stories"), limit(4));
    onSnapshot(q, (snap) => {
      set({ stories: snap?.docs?.map((d) => ({ ...d?.data(), id: d.id })) });
    });
  }, []);

  async function addStory(data_, clear) {
    const data = {
      body: data_?.body,
      userId: user?.uid,
    };

    toolPostAdder(data, data_?.imgs, "stories", () => {
      clear();
    });
  }

  async function removeStory(id) {
    toolRemoveDoc("stories", id);
  }

  return {
    ...store,
    addStory,
    removeStory,
  };
}
