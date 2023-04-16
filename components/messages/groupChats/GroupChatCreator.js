import React, { useRef, useState } from "react";
import useMessageStore from "../../../controls/chats/messages/useMessageStore";
import UseGroupChat from "../../../controls/chats/useGroupChat";
import useUser from "../../../controls/useUser";
import { useAlert } from "../../elements/Alert";
import InputPrivacy from "../../elements/InputPrivacy";

const GroupChatCreator = ({ set, setOpen }) => {
  const nameRef = useRef();
  const { createGroupChat } = UseGroupChat();
  const [privacy, setPrivacy] = useState("public");
  const { user } = useUser();
  const store = useMessageStore();
  const { open, close } = useAlert();

  const onCreateHandler = async () => {
    open("creating group chat...", true);
    if (!nameRef.current?.value) return;
    const groupData = {
      name: nameRef.current?.value,
      userId: user?.uid,
      from: user?.uid,
      members: [user?.uid],
      type: "group",
      privacy,
    };
    const createdConverse = await createGroupChat(groupData);
    store.set({ selectedConverse: createdConverse });
    setOpen(false);
    set(false);
    close();
  };
  return (
    <div className="flex flex-col flex-1 p-2 ">
      <div className="flex-1  flex-col flex gap-2 justify-start  flex-wrap content-start  ">
        <span className="input-div flex-1d w-full">
          <label className="input-text" htmlFor="name">
            Group Name
          </label>
          <input ref={nameRef} name="name" className="input" />
        </span>
        <span className="input-div max-w-[110px] ">
          <label className="input-text" htmlFor="name">
            Privacy
          </label>
          <InputPrivacy defaultValue={"public"} onInput={setPrivacy} />
        </span>
      </div>
      <footer className="flex gap-3 pt-3">
        <button onClick={onCreateHandler} className="btn-prime">
          Create Group Chat
        </button>
        <button className="btn-sec" onClick={() => set(false)}>
          cancel
        </button>
      </footer>
    </div>
  );
};

export default GroupChatCreator;
