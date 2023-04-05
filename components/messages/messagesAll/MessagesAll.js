import { useRouter } from "next/router";
import React, { useEffect } from "react";
import UseMessages from "../../../controls/chats/useMessages";
import useUser from "../../../controls/useUser";
import ConverseItem from "../conver/ConverseItem";
import MessageCreator from "../messageCreator/MessageCreator";

const MessagesAll = () => {
  const { listenConverse, ...msg } = UseMessages();
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    const unsub = listenConverse();
    return unsub;
  }, [user]);
  // console.log("msgsss", msg.converse);
  const onSelectItemHandler = (converse) => {
    msg.set({ selectedConverse: converse, openSelected: true });
    // router.push({ query: { ...router.query, messageTab: "all" } });
  };
  return (
    <div className="box flex-d1 max-w-[280px] flex gap-4 ">
      <div className="flex-1">
        <header className="flex gap-2 justify-between">
          <h2 className="text-h2">Messages </h2>
          <MessageCreator />
        </header>
        <div className="flex flex-col py-3">
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
    </div>
  );
};

export default MessagesAll;
