import React from "react";
import useNotifs from "../../../controls/useNotifs";
import UserConfirmItem from "../userConfirmItem/UserConfirmItem";

const UserConfirmLIsts = () => {
  const { notifs } = useNotifs();
  const filteredNotifs = notifs?.filter(
    (n) => n.type == "relation" && !n.confirmed
  );

  if (filteredNotifs?.length == 0) return null;
  return (
    <div className="flex flex-col gap-3 ">
      {filteredNotifs?.map((notif) => (
        <UserConfirmItem notif={notif} key={notif?.id} />
      ))}
    </div>
  );
};

export default UserConfirmLIsts;
