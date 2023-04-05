import React from "react";
import NotifItemDiv from "./NotifItemDiv";
import NotifItemMessageAcceptedRequest from "./NotifItemMessageAcceptedRequest";

const NotifItemMessageRequest = ({ notif }) => {
  //   return notif?.subtype;
  switch (notif?.subtype) {
    case "request":
      return <NotifItemMessageAcceptedRequest notif={notif} />;
    default:
      return (
        <NotifItemDiv
          notif={notif}
          //   msg ={}
          //   msg={`type: ${notif?.type} subtype: ${notif?.subtype} notif: ${notif?.notif}`}
        />
      );
  }
};

export default NotifItemMessageRequest;
