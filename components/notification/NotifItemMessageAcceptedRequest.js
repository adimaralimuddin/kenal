import React from "react";
import UseMessageRequest from "../../controls/chats/useMessageRequest";
import NotifItemDiv from "./NotifItemDiv";

const NotifItemMessageAcceptedRequest = ({ notif }) => {
  const { acceptRequest, declineRequest } = UseMessageRequest();

  const onAcceptHandler = () => {
    acceptRequest(notif);
  };
  const onDeclineHandler = () => {
    declineRequest(notif);
  };

  const msg = () => {
    if (notif?.confirmed) {
      if (notif?.accepted) {
        return " you have joined a group chat";
      } else {
        return " you refused to join a group chat";
      }
    } else {
      return " want you to join a group chat";
    }
  };
  return (
    <NotifItemDiv
      notif={notif}
      onyes={onAcceptHandler}
      onNo={onDeclineHandler}
      confirmButtons={true}
      msg={msg()}
    />
  );
};

export default NotifItemMessageAcceptedRequest;
