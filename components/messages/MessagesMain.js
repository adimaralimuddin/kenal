import { useRouter } from "next/router";
import React, { useEffect } from "react";
import UseMessageRequest from "../../controls/chats/useMessageRequest";
import useUser from "../../controls/useUser";
import MessagesMainMenu from "./MessagesMainMenu";
import ConverseSelected from "./conver/ConverseSelected";
import MessagesAll from "./messagesAll/MessagesAll";
import MessagesRequestMain from "./messagesRequest/MessagesRequestMain";

const MessagesMain = () => {
  const router = useRouter();
  const tab = router.query?.messageTab;
  const { user } = useUser();
  const { listenRequest } = UseMessageRequest();

  useEffect(() => {
    const unsub = listenRequest();
    return unsub;
  }, [user]);
  return (
    <div className="flex flex-1 gap-4 min-h-[500px]">
      <div className="flex-1 flex flex-col gap-4">
        <MessagesMainMenu />
        {(tab === "all" || !tab) && <ConverseSelected />}
        {tab === "request" && <MessagesRequestMain />}
      </div>
      <MessagesAll />
    </div>
  );
};

export default MessagesMain;
