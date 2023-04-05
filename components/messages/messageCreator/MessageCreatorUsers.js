import React, { useState } from "react";
import useChatMutator from "../../../controls/chats/useChatMutator";
import UserLists from "../../user/UserLists";

const MessageCreatorUsers = ({ users, setUsers }) => {
  const { createPrivateConverse } = useChatMutator();
  const onChatHandler = (user) => {
    console.log("user", user);
    createPrivateConverse({ user });
  };
  return (
    <div>
      <UserLists
        title="find someone to chat with 😊"
        users={users}
        setUsers={setUsers}
        icon="chat-3"
        onUserSelect={onChatHandler}
      />
    </div>
  );
};

export default MessageCreatorUsers;
