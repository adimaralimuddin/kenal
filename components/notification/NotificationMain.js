import { useState } from "react";
import useNotifs from "../../controls/useNotifs";
import useUser from "../../controls/useUser";
import Icon from "../elements/Icon";
import IconBadge from "../elements/IconBadge";
import NotifItem from "./NotifItem";

export default function NotificationMain() {
  const [open, setOpen] = useState(false);
  const { notifs, getNotifBadge } = useNotifs();
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="">
      <span>
        <IconBadge
          value={getNotifBadge()}
          onClick={() => setOpen(true)}
          icon="notification-2"
          iconClass="text-xl font-semiboldd text-slate-500d cursor-pointer"
        />
      </span>
      {open && (
        <div className="fixed flex flex-col animate-expand bg-white dark:bg-d1 w-full max-w-sm top-0 right-0 h-full z-20 shadow-lg">
          <span className="relative">
            <Icon
              onClick={() => setOpen((p) => !p)}
              className="absolute cursor-pointer bg-pink-400  ring-[2px] ring-white text-white dark:text-white p-2 top-3 -left-2 shadow-lg z-10"
            >
              arrow-right
            </Icon>
          </span>
          <h2 className="font-semibold p-2  px-8 mt-2 ring-1d ">
            You have {notifs?.length} Notifications
          </h2>
          <div className="-z-50 overflow-y-auto m-[1px]">
            {notifs?.map((notif) => (
              <NotifItem notif={notif} key={notif?.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
