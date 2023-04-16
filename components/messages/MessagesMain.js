import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UseMessageRequest from "../../controls/chats/useMessageRequest";
import useUser from "../../controls/useUser";
import ConverseSelected from "./conver/ConverseSelected";
import MessagesAll from "./messagesAll/MessagesAll";
import MessagesRequestMain from "./messagesRequest/MessagesRequestMain";

const MessagesMain = () => {
  const { user } = useUser();
  const { listenRequest } = UseMessageRequest();
  const router = useRouter();
  const tab = router.query?.messageTab;
  const [isMessagesShown, setShowMessages] = useState(true);

  useEffect(() => {
    const unsub = listenRequest();
    return unsub;
  }, [user]);

  return (
    <div className="flex flex-1 gap-4 relative ">
      {(!tab || tab == "all") && (
        <ConverseSelected setOpenMessages={setShowMessages} />
      )}
      {tab === "request" && <MessagesRequestMain />}

      {isMessagesShown && (
        <MessagesAll
          setShowMessages={setShowMessages}
          className=" max-h-[100%] flex sm:hidden absolute top-0 right-0 shadow-lg shadow-slate-300 dark:shadow-slate-900 ring-1 ring-slate-200 dark:ring-slate-600  "
        />
      )}
      <MessagesAll className="flex-1 hidden sm:flex " />
    </div>
  );
};

export default MessagesMain;
