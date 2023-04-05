import React from "react";
import UseMessages from "../../../controls/chats/useMessages";
import useUser from "../../../controls/useUser";

const ConverLeaveBtn = ({ conver }) => {
  const { leaveGroupChat, selectedConverse } = UseMessages();
  const { user } = useUser();

  const onLeaveGroupHandler = () => {
    console.log("conver sss", selectedConverse);
    leaveGroupChat();
    // leaveGroupChat({
    //   from: conver.from,
    //   converseId: conver.id,
    // });
  };

  if (selectedConverse?.userId === user?.uid) {
    return null;
  }

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
