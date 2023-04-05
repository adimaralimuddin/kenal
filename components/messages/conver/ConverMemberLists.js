import React, { useState } from "react";
import UseMessages from "../../../controls/chats/useMessages";
import useUser from "../../../controls/useUser";
import ButtonPrim from "../../elements/ButtonPrim";
import UserItem from "../../user/UserItem";
import ConverMemberAdder from "./ConverMemberAdder";

const ConverMemberLists = () => {
  const { selectedConverse, set, ...msg } = UseMessages();
  const { user } = useUser();
  return (
    <div className=" flex-1d flex flex-col ">
      {!msg.isAddingMember && (
        <header className="flex gap-2 justify-between items-center">
          <p className="text-sm">
            members ({selectedConverse?.members?.length})
          </p>
          {selectedConverse?.userId === user?.uid && (
            <ButtonPrim onClick={() => set({ isAddingMember: true })}>
              Add Member
            </ButtonPrim>
          )}
        </header>
      )}
      {msg.isAddingMember && (
        <ConverMemberAdder friends={msg?.friends} set={set} />
      )}
      {!msg.isAddingMember && (
        <div className=" py-2">
          {selectedConverse?.members?.map((member) => (
            <UserItem small={true} userId={member} key={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConverMemberLists;
