import React, { useState } from "react";
import UseMessages from "../../../controls/chats/useMessages";
import useUser from "../../../controls/useUser";
import Option from "../../elements/Option";

const ConverOption = ({ converse }) => {
  const { leaveGroupChat, selectedConverse } = UseMessages();

  const { user } = useUser();
  const options = [
    {
      text: "Turn Off Notification",
      action: () => state.set((p) => ({ open: true })),
      secure: true,
      icon: "edit-2",
    },
  ];

  if (converse?.userId !== user?.uid) {
    options.push({
      text: "leave Group",
      action: () => leaveGroupChat(),
      secure: true,
      icon: "delete-bin-5",
      className: "text-pink-400",
    });
  }
  return (
    <div>
      <Option
        show={true}
        options={options}
        // userId={data?.userId?.[0]}
        userId={user?.uid}
        onlyUser={true}
      />
    </div>
  );
};

export default ConverOption;
