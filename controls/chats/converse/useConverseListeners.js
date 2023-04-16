import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import ToolSnapToDocs from "../../relations/toolSnapToDocs";
import toolSnapToDoc from "../../toolSnapToDoc";
import useUser from "../../useUser";
import useChatMutator from "../useChatMutator";

const useConverseListeners = () => {
  const { createPrivateConverse } = useChatMutator();
  const { user } = useUser();
  async function getConverseItemByUsers(users = []) {
    const toUserId = users?.[1];
    const q = query(
      collection(db, "converse"),
      where("type", "==", "private"),
      where("members", "in", [users, [...users].reverse()])
    );
    const converseSnap = await getDocs(q);
    const converseItem = ToolSnapToDocs(converseSnap)?.[0];
    if (converseItem) {
      return converseItem;
    }
    const createdConverse = await createPrivateConverse({
      user: { id: toUserId },
    });
    return createdConverse;
  }
  function listenConverse(caller) {
    if (!user?.uid) return;
    const q = query(
      collection(db, "converse"),
      where("members", "array-contains", user?.uid)
    );
    const unsub = onSnapshot(q, (snap) => {
      const converseSnap = ToolSnapToDocs(snap);
      // const selectedConverse = store?.selectedConverse;
      // if (!selectedConverse) {
      //   store.set({
      //     converse: converseSnap,
      //     selectedConverse: converseSnap?.[0],
      //   });
      // }
      // if (selectedConverse) {
      //   const converseToUpdate = converseSnap?.find(
      //     (c) => c?.id === store?.selectedConverse?.id
      //   );
      //   store.set({
      //     converse: converseSnap,
      //     // selectedConverse: converseToUpdate,
      //   });
      // }
      caller?.(converseSnap);
    });
    return unsub;
  }

  function listenConverseItem(converse, caller) {
    if (!converse?.id) return () => console.log("no converse");
    const q = query(doc(db, "converse", converse?.id));
    const ret = onSnapshot(q, (snap) => {
      // store.set({ selectedConverse: snap });
      const converseSnap = toolSnapToDoc(snap);
      caller && caller(converseSnap);
    });
    return ret;
  }
  return { listenConverse, listenConverseItem, getConverseItemByUsers };
};

export default useConverseListeners;
