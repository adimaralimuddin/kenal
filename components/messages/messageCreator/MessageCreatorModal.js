import React, { useState } from "react";
import Modal from "../../elements/Modal";
import GroupChatCreator from "../groupChats/GroupChatCreator";
import GroupChatCreatorButton from "../groupChats/GroupChatCreatorButton";
import MessageCreatorUsers from "./MessageCreatorUsers";

const MessageCreatorModal = ({ open, set }) => {
  const [isCreatingGroupChat, setIsCreatingGroupChat] = useState(false);
  const [users, setUsers] = useState([]);

  return (
    <div>
      <Modal open={open} set={set}>
        <div className="box flex flex-col flex-1 gap-2 p-4 ">
          <header className="flex items-center justify-between gap-4">
            <h2 className="text-h2">Create Message</h2>
            {!isCreatingGroupChat && (
              <GroupChatCreatorButton set={setIsCreatingGroupChat} />
            )}
          </header>
          <div className="flex-1  flex flex-col p-2">
            {isCreatingGroupChat && (
              <GroupChatCreator set={setIsCreatingGroupChat} />
            )}
            {!isCreatingGroupChat && (
              <MessageCreatorUsers users={users} setUsers={setUsers} />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MessageCreatorModal;
