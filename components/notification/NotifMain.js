import React, { useEffect } from "react";
import useNotifs from "../../controls/useNotifs";
import useUser from "../../controls/useUser";
import NotifItem from "./NotifItem";

const NotifMain = () => {
  const { user } = useUser();
  const { notifs, listen } = useNotifs();
  useEffect(() => {
    const unsub = listen();
    return unsub;
  }, [user]);
  return (
    <div className="box h-full flex flex-col gap-2 -dz-50 overflow-y-auto m-[1px] ">
      <h2 className="text-h2 font-medium text-lg px-2">Notifications</h2>
      <h2 className="font-s  px-2 text-slate-500 dark:text-slate-400  ">
        You have {notifs?.length} Notifications
      </h2>
      <div className="flex flex-col gap-2 p-2">
        {notifs?.map((notif) => (
          <NotifItem notif={notif} key={notif?.id} />
        ))}
      </div>
    </div>
  );
};

export default NotifMain;
