import React, { useRef, useState } from "react";
import UseGroupChat from "../../../controls/chats/useGroupChat";
import useUser from "../../../controls/useUser";
import InputPrivacy from "../../elements/InputPrivacy";

const GroupChatCreator = ({ set }) => {
  const nameRef = useRef();
  const { createGroupChat } = UseGroupChat();
  const [privacy, setPrivacy] = useState("public");
  const { user } = useUser();

  const onCreateHandler = async () => {
    if (!nameRef.current?.value) return console.log("no gourp name specified!");
    const groupData = {
      name: nameRef.current?.value,
      userId: user?.uid,
      from: user?.uid,
      members: [user?.uid],
      type: "group",
      privacy,
    };
    await createGroupChat(groupData);
    set(false);
  };
  return (
    <div className="flex flex-col flex-1 p-2">
      <header>{/* <h3>Create Group Chat</h3> */}</header>
      <div className="flex-1 flex-col flex gap-2 justify-start  flex-wrap content-start  ">
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
      <footer className="flex gap-3">
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
