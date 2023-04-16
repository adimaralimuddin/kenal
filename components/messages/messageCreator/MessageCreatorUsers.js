import React, { useState } from "react";
import useChatMutator from "../../../controls/chats/useChatMutator";
import UserLists from "../../user/UserLists";

const MessageCreatorUsers = ({ users, setUsers, setOpen }) => {
  const { createPrivateConverse } = useChatMutator();
  const onChatHandler = (user) => {
    createPrivateConverse({ user });
    setOpen(false);
  };
  return (
    <div>
      <UserLists
        title="find someone to chat with 😊"
        users={users}
        setUsers={setUsers}
        icon="add"
        onUserSelect={onChatHandler}
      />
    </div>
  );
};

export default MessageCreatorUsers;
