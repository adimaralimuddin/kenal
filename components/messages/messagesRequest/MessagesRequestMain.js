import React, { useEffect } from "react";
import UseMessageRequest from "../../../controls/chats/useMessageRequest";
import useUser from "../../../controls/useUser";
import NotifItem from "../../notification/NotifItem";
import NotifItemMessageRequest from "../../notification/NotifItemMessageRequest";
// import MessageRequestItem from "./MessageRequestItem";

const MessagesRequestMain = () => {
  const { user } = useUser();
  const { listenRequest, notifs } = UseMessageRequest();

  useEffect(() => {
    if (!user) return;
    const unsub = listenRequest();
    return () => {
      unsub();
    };
  }, [user]);
  return (
    <div className="box flex-1">
      <header>
        <h2 className="text-h2">Messages Request</h2>
      </header>
      <div className="py-2 flex flex-col gap-1">
        {notifs?.map((notif) => (
          <NotifItem notif={notif} key={notif?.id} />
        ))}
      </div>
    </div>
  );
};

export default MessagesRequestMain;
