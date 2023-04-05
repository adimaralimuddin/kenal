import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import UseMessages, {
  messagesStore,
} from "../../../controls/chats/useMessages";
import useUser from "../../../controls/useUser";
import Icon from "../../elements/Icon";
import UserItem from "../../user/UserItem";
import MessageFeeds from "../MessageFeeds";
import ConverPanel from "./ConverPanel";
import ConverseItem from "./ConverseItem";

const ConverseSelected = ({}) => {
  const { user } = useUser();
  const store = messagesStore();
  const msg = UseMessages();
  const { set } = msg;

  useEffect(() => {
    msg.listenConverseChats(msg.selectedConverse?.id);
  }, [msg.selectedConverse]);

  const toUserId = () =>
    msg.selectedConverse?.members?.filter((uid) => uid !== user?.uid)?.[0];
  return (
    <div className="box flex flex-1 p-0">
      <div className=" flex flex-col flex-1 ">
        <header className="flex justify-between items-start border-b-[1px] p-2 px-3">
          {msg.selectedConverse?.type === "group" && (
            <ConverseItem conver={msg.selectedConverse} />
          )}
          {msg.selectedConverse?.type === "private" && (
            <UserItem
              userId={toUserId()}
              defaultUser={msg?.userSnap}
              passer={(userSnap) => set({ toUser: userSnap })}
            />
          )}
          <Icon
            className="cursor-pointer dark:text-slate-200"
            onClick={() =>
              store.set({ isConverPanelOpen: !store.isConverPanelOpen })
            }
          >
            menu
          </Icon>
        </header>
        <MessageFeeds
          converse={msg.selectedConverse}
          chats={store?.chats}
          onChatsSnap={(chats) => store.set({ chats })}
          // onConverseSnap={(selectedConverse) => store.set({ selectedConverse })}
        />
      </div>
      {!store.isConverPanelOpen && <ConverPanel />}
    </div>
  );
};

export default ConverseSelected;
