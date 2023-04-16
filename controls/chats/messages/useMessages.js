import { arrayRemove, arrayUnion } from "firebase/firestore";
import toolUpdatedoc from "../../toolUpdateDoc";
import useNotifs from "../../useNotifs";
import useUser from "../../useUser";
import useMessageStore from "./useMessageStore";

const UseMessages = () => {
  const store = useMessageStore();
  const { user } = useUser();
  const { notify } = useNotifs();

  async function addMember(
    { memberId, converseId = store.selectedConverse.id },
    callback
  ) {
    const selectedConverId = store?.selectedConverse?.id;
    if (!selectedConverId) return console.log("no selcec id");
    const result = await toolUpdatedoc("converse", selectedConverId, {
      requestedMembers: arrayUnion(memberId),
    });

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

  return {
    ...store,
    addMember,
    cancelRequest,
    leaveGroupChat,
  };
};

export default UseMessages;
