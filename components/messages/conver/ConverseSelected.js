import React, { memo, useEffect, useMemo } from "react";
import useMessageStore from "../../../controls/chats/messages/useMessageStore";
import UseMessages from "../../../controls/chats/messages/useMessages";
import useChatListeners from "../../../controls/chats/useChatListeners";
import useUser from "../../../controls/useUser";
import Icon from "../../elements/Icon";
import IconBtn from "../../elements/IconBtn";
import UserItem from "../../user/UserItem";
import MessageFeeds from "../MessageFeeds";
import ConverPanel from "./ConverPanel";
import ConverseItem from "./ConverseItem";

const ConverseSelected = ({ setOpenMessages }) => {
  const { user } = useUser();
  const { listenConverseChat } = useChatListeners();
  const store = useMessageStore();

  const msg = UseMessages();
  const { set } = msg;
  const converse = msg.selectedConverse;
  const memoizedConverse = useMemo(() => converse, []);

  useEffect(() => {
    listenConverseChat(memoizedConverse, (chatsSnap) => {
      store.set({ chats: chatsSnap });
    });
  }, [memoizedConverse]);

  const toUserId = () =>
    converse?.members?.filter((uid) => uid !== user?.uid)?.[0];

  if (!converse) {
    return (
      <div className="box flex flex-col items-center justify-center flex-1 text-slate-400 text-lg">
        <h2 className="">No Conversation Selected!</h2>
        <h3>Try to create one.</h3>
      </div>
    );
  }

  return (
    <div className="box flex flex-wrap-reverse flex-1 p-0 ">
      <div className=" flex flex-col flex-1  ">
        <header className="flex flex-wrap gap-2 justify-between items-start border-b-[1px] p-2 px-3 dark:border-slate-700">
          {converse?.type === "group" && <ConverseItem conver={converse} />}
          {converse?.type === "private" && (
            <UserItem
              userId={toUserId()}
              defaultUser={msg?.userSnap}
              passer={(userSnap) => set({ toUser: userSnap })}
            />
          )}
          <div className="flex gap-1">
            {converse?.type === "group" && (
              <Icon
                className="cursor-pointer dark:text-slate-200"
                onClick={() =>
                  store.set({ isConverPanelOpen: !store.isConverPanelOpen })
                }
              >
                menu
              </Icon>
            )}
            <IconBtn
              className="block sm:hidden"
              onClick={() => setOpenMessages((p) => !p)}
            >
              message-2
            </IconBtn>
          </div>
        </header>
        <T />
      </div>
      {store.isConverPanelOpen && converse?.type === "group" && <ConverPanel />}
    </div>
  );
};

const T = () => {
  const store = useMessageStore();
  const converse = store.selectedConverse;
  return <MessageFeeds converse={converse} />;
};

export default ConverseSelected;
