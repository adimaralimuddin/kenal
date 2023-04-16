import React, { useState } from "react";
import UseMessages from "../../../controls/chats/messages/useMessages";
import useUser from "../../../controls/useUser";
import ButtonPrim from "../../elements/ButtonPrim";
import UserItem from "../../user/UserItem";
import ConverMemberAdder from "./ConverMemberAdder";

const ConverMemberLists = () => {
  const { set, converseSnap, ...msg } = UseMessages();
  const { user } = useUser();
  const converse = msg.selectedConverse;

  return (
    <div className=" flex-1d flex flex-col ">
      {!msg.isAddingMember && (
        <header className="flex gap-2 justify-between items-center">
          <p className="text-sm">members ({converseSnap?.members?.length})</p>
          {converseSnap?.userId === user?.uid && (
            <ButtonPrim onClick={() => set({ isAddingMember: true })}>
              Add Member
            </ButtonPrim>
          )}
        </header>
      )}
      {msg.isAddingMember && (
        <ConverMemberAdder
          converseSnap={converseSnap}
          friends={msg?.friends}
          set={set}
        />
      )}
      {!msg.isAddingMember && (
        <div className=" py-2">
          {converseSnap?.members?.map((member) => (
            <UserItem small={true} userId={member} key={member}>
              {converse?.type === "group" && converse?.userId === member && (
                <small className="mx-2 py-[2px] px-2 bg-green-100 dark:bg-green-200 text-green-600 rounded-md dfont-semibold">
                  admin
                </small>
              )}
            </UserItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConverMemberLists;
