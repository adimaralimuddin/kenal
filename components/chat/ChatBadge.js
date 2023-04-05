import React, { useEffect, useState } from "react";
import UseMessages from "../../controls/chats/useMessages";
import useUser from "../../controls/useUser";

const ChatBadge = () => {
  const { user } = useUser();
  const { listen } = UseMessages();
  const [t, tt] = useState(false);
  useEffect(() => {
    listenMessages();
    return () => {};
  }, [user, t]);

  const listenMessages = async () => {
    listen();
  };
  return (
    <div onClick={() => tt((p) => !p)}>
      <span className="relative">
        <span className="p-2 bg-green-400 rounded-full"></span>
      </span>
    </div>
  );
};

export default ChatBadge;
