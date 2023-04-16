import { doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase.config";
import toolSnapToDoc from "../toolSnapToDoc";

const UseStoryListeners = () => {
  function listenStoryItem({ storyId }, caller) {
    if (!storyId) return () => console.log("no story id on listenStoryItem");
    const q = query(doc(db, "stories", storyId));
    const ret = onSnapshot(q, (snap) => {
      const storyItemSnap = toolSnapToDoc(snap);
      caller && caller(storyItemSnap);
    });
    return ret;
  }
  return { listenStoryItem };
};

export default UseStoryListeners;
