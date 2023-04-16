import React, { useState } from "react";
import UseMessageRequest from "../../controls/chats/useMessageRequest";
import useNotifs from "../../controls/useNotifs";
import Icon from "../elements/Icon";
import IconBtn from "../elements/IconBtn";
import Menu from "../elements/Menu";

const MainBurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const { getNotifBadge: getMessageNotifBadge } = UseMessageRequest();
  const { getNotifBadge } = useNotifs();
  const textClass = " hidden lg:block ";

  return (
    <div className="relative flex items-center sm:hidden">
      <IconBtn onClick={() => setOpen((p) => !p)}>menu</IconBtn>
      {open && (
        <div className=" fixed top-[75px] left-3 sm:hidden box  flex-1 flex-col p-0 py-3 max-w-[90px]d dlg:max-w-[300px] max-h-[350px]  shadow-lg  shadow-slate-400">
          <div>
            <div className="flex-1 ring-1d flex items-center justify-center">
              <IconBtn onClick={() => setOpen(false)} className="">
                close
              </IconBtn>
            </div>
            <Menu
              tab="home"
              icon="home"
              text="Home"
              defaultTab={"home"}
              tabText={"tab"}
              left={true}
              textClass={textClass}
            />
            {/* <Menu
          tab="explore"
          icon="search"
          text="Explore"
          tabText={"tab"}
          left={true}
          textClass={textClass}
        /> */}
            <Menu
              badgeValue={getNotifBadge()}
              tab="notification"
              icon="notification"
              text="Notifications"
              tabText={"tab"}
              left={true}
              textClass={textClass}
            />
            <Menu
              badgeValue={getMessageNotifBadge()}
              tab="messages"
              icon="message"
              text="messages"
              tabText={"tab"}
              left={true}
              textClass={textClass}
            />
            <Menu
              tab="profile"
              icon="user"
              text="Profile"
              tabText={"tab"}
              left={true}
              textClass={textClass}
            />
            <Menu
              tab="settings"
              icon="settings-3"
              text="Settings"
              tabText={"tab"}
              left={true}
              textClass={textClass}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainBurgerMenu;
