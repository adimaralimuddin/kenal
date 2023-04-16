import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import ToolSnapToDocs from "../relations/toolSnapToDocs";
import useUser from "../useUser";

const useChatListeners = () => {
  const { user } = useUser();

  function listenConverseChat(converse, caller) {
    if (!user || !converse)
      return () =>
        console.log("no converse or user on listenConverseChats", {
          converse,
          user,
        });
    const converseId = converse?.id;
    const q = query(
      collection(db, "messages"),
      where("converseId", "==", converseId),
      orderBy("timestamp", "asc")
    );
    const ret = onSnapshot(q, (snap) => {
      const chats = ToolSnapToDocs(snap);
      caller && caller(chats);
      //   {
      //     setter && set({ [converseId]: chats });
      //   }
    });
    return ret;
  }

  function listenChatNotifs(fromUserId, caller) {
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

  return { listenConverseChat, listenChatNotifs };
};

export default useChatListeners;
