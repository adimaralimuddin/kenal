import React from "react";
import UseMessageRequest from "../../controls/chats/useMessageRequest";
import Menu from "../elements/Menu";

const MessagesMainMenu = () => {
  const { notifs, getNotifBadge } = UseMessageRequest();
  const textClass = " hidden md:block ";
  return (
    <div className="box flex p-0 px-6  ">
      <Menu
        tab="all"
        tabText="messageTab"
        icon="message-3"
        defaultTab={"all"}
        textClass={textClass}
      />
      <Menu
        tab="personal"
        tabText="messageTab"
        icon="chat-smile-2"
        textClass={textClass}
      />
      <Menu
        tab="group"
        tabText="messageTab"
        icon="discuss"
        text="Group Chats"
        textClass={textClass}
      />
      <Menu
        badgeValue={getNotifBadge()}
        tab="request"
        tabText="messageTab"
        icon="discuss"
        text="Message Request"
        textClass={textClass}
      />
    </div>
  );
};

export default MessagesMainMenu;
