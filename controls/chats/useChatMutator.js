import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import app from "../app";
import toolAddDoc from "../toolAddDoc";
import toolRemoveDoc from "../toolRemoveDoc";
import toolSnapToDoc from "../toolSnapToDoc";
import toolUpdatedoc from "../toolUpdateDoc";
import useUser from "../useUser";

const useChatMutator = () => {
  const { user } = useUser();
  async function createPrivateConverse({ user: toUser, meta = {} }, callback) {
    const data = {
      userId: user.uid,
      to: toUser.id,
      from: user.uid,
      type: "private",
      meta,
      members: [user.uid, toUser.id],
    };
    const createdConverseSnap = await toolAddDoc(app.db.converse, data);
    const converseCreated = toolSnapToDoc(createdConverseSnap);
    await setDoc(doc(db, "writer", converseCreated.id), {});
    callback && callback(converseCreated);
    return converseCreated;
  }

  async function seenChat(chat, caller) {
    if (!chat?.id) return console.log("no chat id on seenChat ", chat);
    if (chat?.seen) return;
    if (chat?.userId === user?.uid) return;

    const chatSeenResult = await toolUpdatedoc(
      "messages",
      chat.id,
      {
        seen: true,
        seenAt: serverTimestamp(),
      },
      caller
    );
    console.log("has seen");
    return chatSeenResult;
  }

  async function deleteConverse(converse, caller) {
    if (!converse?.id) return console.log("no converse id");
    return await toolRemoveDoc("converse", converse.id, caller);
  }

  return { createPrivateConverse, seenChat, deleteConverse };
};

export default useChatMutator;
