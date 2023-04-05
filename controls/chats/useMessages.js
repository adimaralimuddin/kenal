import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  documentId,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import create from "zustand";
import { db } from "../../firebase.config";
import ToolSnapToDocs from "../relations/toolSnapToDocs";
import toolPostAdder from "../toolPostAdder";
import toolSnapToDoc from "../toolSnapToDoc";
import toolUpdatedoc from "../toolUpdateDoc";
import useNotifs from "../useNotifs";
import useUser from "../useUser";

export const messagesStore = create((set) => ({ set }));

const UseMessages = () => {
  const store = messagesStore();
  const { user } = useUser();
  const { notify } = useNotifs();

  function listen(caller) {
    if (!user?.uid) return;
    const q = query(
      collection(db, "notifs"),
      where("from", "==", user?.uid),
      orderBy("timestamp", "desc")
    );
    return onSnapshot(q, (snap) => {
      const notifs = ToolSnapToDocs(snap);
      store.set({ notifs });
      caller && caller?.(notifs, snap);
    });
  }

  function listenConverse(caller) {
    if (!user?.uid) return;
    const q = query(
      collection(db, "converse"),
      where("members", "array-contains", user?.uid)
    );
    const unsub = onSnapshot(q, (snap) => {
      const converseSnap = ToolSnapToDocs(snap);
      const selectedConverse = store?.selectedConverse;
      if (!selectedConverse) {
        store.set({
          converse: converseSnap,
          selectedConverse: converseSnap?.[0],
        });
      }
      if (selectedConverse) {
        const converseToUpdate = converseSnap?.find(
          (c) => c?.id === store?.selectedConverse?.id
        );
        store.set({
          converse: converseSnap,
          // selectedConverse: converseToUpdate,
        });
      }
      caller?.(converseSnap);
    });
    return unsub;
  }

  function listenConverseChats(converse, callback) {
    const converseId = converse?.id;
    if (!converseId) return () => console.log("no converseId");
    const q = query(
      collection(db, "messages"),
      where("converseId", "==", converseId),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const chatsSnap = ToolSnapToDocs(snap);
      store.set({ chats: chatsSnap });
      callback && callback(chatsSnap);
    });
    return unsub;
  }

  function listenConverseItem(converse, caller) {
    if (!converse) return () => console.log("no converse");
    const q = query(doc(db, "converse", converse?.id));
    const ret = onSnapshot(q, (snap) => {
      // store.set({ selectedConverse: snap });
      const converseSnap = toolSnapToDoc(snap);
      caller && caller(converseSnap);
    });
    return ret;
  }

  async function addMember(
    { memberId, converseId = store.selectedConverse.id },
    callback
  ) {
    const selectedConverId = store?.selectedConverse?.id;
    if (!selectedConverId) return console.log("no selcec id");
    const result = await toolUpdatedoc("converse", selectedConverId, {
      requestedMembers: arrayUnion(memberId),
    });
    // console.log("data to notif ", { memberId, userId: user.uid, converseId });
    // addNotif(memberId, user.uid, "messagerequest", converseId);
    notify({
      to: memberId,
      from: user.uid,
      docId: converseId,
      msg: "want you to join a group chat.",
      type: "message",
      subtype: "request",
      notif: "request",
      confirmed: false,
      seen: false,
    });
    callback && callback?.(result);
  }

  async function cancelRequest(
    { memberId, converseId = store.selectedConverse.id },
    callback
  ) {
    const selectedConverId = store?.selectedConverse?.id;
    if (!selectedConverId) return console.log("no selcec id");
    const result = await toolUpdatedoc("converse", selectedConverId, {
      requestedMembers: arrayRemove(memberId),
    });
    // console.log("data to notif ", { memberId, userId: user.uid, converseId });
    // addNotif(memberId, user.uid, "messagerequest", converseId);
    // notify({
    //   to: memberId,
    //   from: user.uid,
    //   docId: converseId,
    //   msg: "want you to join a group chat.",
    //   notif: "messagerequest",
    //   type: "messagerequest",
    //   subtype: "request",
    // });
    callback && callback?.(result);
  }

  async function leaveGroupChat(converse, callback) {
    const selectedConverse = store.selectedConverse;
    const converseId = converse?.id || selectedConverse?.id;
    const result = await toolUpdatedoc("converse", converseId, {
      members: arrayRemove(user.uid),
    });

    store.set({ selectedConverse: store.converse?.[0] });

    notify({
      to: converse?.from || selectedConverse?.from,
      from: user.uid,
      docId: converseId,
      msg: "left the group chat.",
      notif: "messagerequest",
      type: "messagerequest",
      subtype: "left-group",
    });
    callback && callback?.(result);
  }

  async function addChat({ data, imgs, converse }, callback) {
    if (!converse?.id) return console.log("no converse id");
    const isContinue = converse?.lastUserId === user?.uid;
    const addedChat = await toolPostAdder(
      {
        ...data,
        seen: false,
        isContinue,
        last: true,
        createdAt: serverTimestamp(),
      },
      imgs,
      "messages"
    );
    toolUpdatedoc("converse", converse?.id, {
      lastUserId: user.uid,
      lastChatBody: data?.body || "",
      lastChatDate: serverTimestamp(),
      lastChatId: addedChat.id,
    });

    if (converse?.lastChatId) {
      toolUpdatedoc("messages", converse.lastChatId, {
        last: isContinue ? false : true,
      });
    }

    callback?.(data, imgs);
    return addedChat;
  }

  return {
    ...store,
    listen,
    listenConverse,
    addMember,
    cancelRequest,
    addChat,
    listenConverseChats,
    leaveGroupChat,
    listenConverseItem,
  };
};

export default UseMessages;
