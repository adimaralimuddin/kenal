import { serverTimestamp } from "firebase/firestore";
import toolPostAdder from "../toolPostAdder";
import toolUpdatedoc from "../toolUpdateDoc";
import useUser from "../useUser";

const useChatAdder = () => {
  const { user, userProfile } = useUser();
  async function addChat({ data, imgs, converse }, callback) {
    if (!converse?.id) return console.log("no converse id");
    const isContinue = converse?.lastUserId === user?.uid;
    const addedChat = await toolPostAdder(
      {
        ...data,
        seen: false,
        isContinue,
        last: true,
        userId: user.uid,
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

  async function makeTyping(converse) {
    console.log("to typing ");
    await toolUpdatedoc("converse", converse?.id, {
      userTyping: user.uid,
      userTypingName: userProfile.displayName,
      isTyping: true,
    });
  }

  async function doneTyping(converse) {
    console.log("to done typing ");
    await toolUpdatedoc("converse", converse?.id, {
      userTyping: user.uid,
      userTypingName: userProfile.displayName,
      isTyping: false,
    });
  }
  return { addChat, makeTyping, doneTyping };
};

export default useChatAdder;
