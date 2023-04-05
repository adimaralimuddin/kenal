import { doc, onSnapshot, query } from "firebase/firestore";
import create from "zustand";
import { db } from "../../firebase.config";
import toolSnapToDoc from "../toolSnapToDoc";
export const ExplorePostStore = create((set) => ({ set }));
const UseExplorePosts = () => {
  const store = ExplorePostStore();
  function listenPostItem(postId, caller) {
    if (!postId) return () => console.log("no postid");
    const q = query(doc(db, "posts", postId));
    const ret = onSnapshot(q, (snap) => {
      const postSnap = toolSnapToDoc(snap);
      store.set({ post: postSnap });
      caller && caller(postSnap);
    });
    return ret;
  }
  return { ...store, listenPostItem };
};

export default UseExplorePosts;
