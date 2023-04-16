import React from "react";
import UseMessages from "../../../controls/chats/messages/useMessages";
import IconBtn from "../../elements/IconBtn";
import UserItem from "../../user/UserItem";

const ConverRequestMembers = () => {
  const { cancelRequest, converseSnap } = UseMessages();

  const onCancelRequestHandler = (uid) => {
    cancelRequest({ memberId: uid });
  };

  return (
    <div className="flex flex-col gap-2 bg-slate-50 dark:bg-slate-700 p-1 rounded-xl">
      <header>
        <p className="text-slate-500 dark:text-slate-300 px-3 p-1 text-sm">
          Requested Members
        </p>
      </header>
      <div className="flex flex-col gap-1">
        {converseSnap?.requestedMembers?.length <= 1 && (
          <p className="text-center text-sm p-3 text-slate-400 ">
            no member request...
          </p>
        )}
        {converseSnap?.requestedMembers?.map((uid) => (
          <div key={uid} className="flex justify-between items-center">
            <UserItem userId={uid} />
            <IconBtn onClick={() => onCancelRequestHandler(uid)}>close</IconBtn>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConverRequestMembers;
