import React from "react";
import UseMessages from "../../../controls/chats/messages/useMessages";

const ConverLeaveBtn = () => {
  const { leaveGroupChat } = UseMessages();

  const onLeaveGroupHandler = () => {
    leaveGroupChat();
  };

  return (
    <div>
      <button
        className="font-medium text-sm hover:underline text-pink-400"
        onClick={onLeaveGroupHandler}
      >
        leave group
      </button>
    </div>
  );
};

export default ConverLeaveBtn;
