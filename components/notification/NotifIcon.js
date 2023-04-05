import React, { useState } from "react";
import IconBadge from "../elements/IconBadge";

const NotifIcon = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <span>
        <IconBadge
          value={notifs?.filter?.((p) => !p.seen)?.length}
          onClick={() => setOpen(true)}
          icon="notification-2"
          iconClass="text-xl font-semiboldd text-slate-500d cursor-pointer"
        />
      </span>
    </div>
  );
};

export default NotifIcon;
