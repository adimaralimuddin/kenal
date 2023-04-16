import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useConverseListeners from "../../../controls/chats/converse/useConverseListeners";
import UseMessages from "../../../controls/chats/messages/useMessages";
import useUser from "../../../controls/useUser";
import IconBtn from "../../elements/IconBtn";
import MessagesMainMenu from "../MessagesMainMenu";
import ConverseItem from "../conver/ConverseItem";
import MessageCreator from "../messageCreator/MessageCreator";

const MessagesAll = ({ setShowMessages, showMenu = true, className = "" }) => {
  const { set, ...msg } = UseMessages();
  const { listenConverse } = useConverseListeners();
  const { user } = useUser();
  useEffect(() => {
    const unsub = listenConverse((converseSnap) => {
      const selectedConverse = msg?.selectedConverse;
      if (!selectedConverse) {
        set({
          converse: converseSnap,
          selectedConverse: converseSnap?.[0],
        });
      }
      if (selectedConverse) {
        const converseToUpdate = converseSnap?.find(
          (c) => c?.id === msg?.selectedConverse?.id
        );
        set({
          converse: converseSnap,
        });
      }
    });
    return unsub;
  }, [user]);
  const onSelectItemHandler = (converse) => {
    set({ selectedConverse: converse, openSelected: true });
  };

  if (!user) {
    return null;
  }
  return (
    <div
      className={
        " box p-0 flex-col  max-w-[300px]  dgap-4 justify-self-start  " +
        className
      }
    >
      <header className="flex gap-2 justify-between px-2 pt-2 ">
        <h2 className="text-h2">Messages </h2>
        <MessageCreator />
        {setShowMessages && (
          <IconBtn onClick={() => setShowMessages(false)}>close</IconBtn>
        )}
      </header>
      {showMenu && <MessagesMainMenu />}
      <div className="flex flex-1 flex-col py-3d gap-1 overflow-y-auto p-2 relative   min-w-[250px]">
        {msg.converse?.map((conver) => (
          <ConverseItem
            onClick={onSelectItemHandler}
            conver={conver}
            key={conver.id}
            noAvatars={true}
            noIcon={true}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesAll;
