import React from "react";
import UseMessages from "../../../controls/chats/useMessages";
import ConverLeaveBtn from "./ConverLeaveBtn";
import ConverMemberLists from "./ConverMemberLists";
import ConverOption from "./ConverOption";
import ConverRequestMembers from "./ConverRequestMembers";

const ConverPanel = () => {
  const msg = UseMessages();
  const converse = msg?.selectedConverse;
  return (
    <div className="flex-1 flex flex-col gap-2 bg-slate-50d border-l-2 pl-2 p-3">
      <header className="flex gap-2 justify-between items-center">
        {converse?.type === "group" && (
          <h3 className="text-h2">{converse?.name}</h3>
        )}
        {converse?.type === "group" && <ConverLeaveBtn />}
        {/* <ConverOption converse={converse} /> */}
      </header>
      {converse?.type === "group" && <ConverMemberLists />}
      {converse?.type === "group" && <ConverRequestMembers />}
    </div>
  );
};

export default ConverPanel;
