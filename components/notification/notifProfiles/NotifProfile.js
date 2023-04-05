import React from "react";
import NotifItemDiv from "../NotifItemDiv";

const NotifProfile = ({ notif }) => {
  const msg = () => ` started to ${notif?.subtype} you.`;
  return (
    <div>
      <NotifItemDiv notif={notif} msg={msg()} />
    </div>
  );
};

export default NotifProfile;
