import React from "react";
import NotifItemDiv from "../NotifItemDiv";

const NotifProfile = ({ notif }) => {
  const msg = () => {
    switch (notif.subtype) {
      case "accepted":
        return ` accepted your follow request.`;
      case "declined":
        return ` declined your follow request.`;
      case "unfollow":
        return `just unfollowed you.`;
      default:
        return ` started to ${notif?.subtype} you.`;
    }
  };
  return (
    <div onClick={(e) => {}}>
      <NotifItemDiv notif={notif} msg={msg()} />
    </div>
  );
};

export default NotifProfile;
