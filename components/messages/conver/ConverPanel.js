import React, { useEffect } from "react";
import useConverseListeners from "../../../controls/chats/converse/useConverseListeners";
import UseMessages from "../../../controls/chats/messages/useMessages";
import useUser from "../../../controls/useUser";
import GroupChatDeleter from "../groupChats/GroupChatDeleter";
import ConverLeaveBtn from "./ConverLeaveBtn";
import ConverMemberLists from "./ConverMemberLists";
import ConverRequestMembers from "./ConverRequestMembers";

const ConverPanel = () => {
  const msg = UseMessages();
  const { listenConverseItem } = useConverseListeners();
  const converse = msg?.selectedConverse;
  const { user } = useUser();

  useEffect(() => {
    if (!converse || !user) return;
    const unsub = listenConverseItem(converse, (converseSnap) =>
      msg.set({ converseSnap })
    );
    return unsub;
  }, [converse, user]);
  return (
    <div className="flex-1 flex flex-col gap-2 bg-slate-50d border-l-2 dark:border-slate-700 pl-2 p-3">
      <header className="flex gap-2 justify-between items-center">
        {converse?.type === "group" && (
          <h3 className="text-h2">{converse?.name}</h3>
        )}
        {converse?.type === "group" && converse?.userId !== user?.uid && (
          <ConverLeaveBtn />
        )}
      </header>
      {converse?.type === "group" && <ConverMemberLists />}
      {converse?.type === "group" && converse?.userId === user?.uid && (
        <ConverRequestMembers />
      )}
      {converse?.type === "group" && converse?.userId === user?.uid && (
        <GroupChatDeleter className={"self-end mt-auto"} />
      )}
    </div>
  );
};

export default ConverPanel;
