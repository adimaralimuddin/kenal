import Link from "next/link";
import React from "react";
import UseMessageRequest from "../../controls/chats/useMessageRequest";
import useNotifs from "../../controls/useNotifs";
import Icon from "../elements/Icon";
import Menu from "../elements/Menu";

const MainSideBar = () => {
  const { getNotifBadge: getMessageNotifBadge } = UseMessageRequest();
  const { getNotifBadge } = useNotifs();
  const textClass = " hidden lg:block ";
  return (
    <div className="box flex flex-col p-0 py-3 max-w-[90px]d dlg:max-w-[300px] ">
      <Menu
        tab="home"
        icon="home"
        text="Home"
        defaultTab={"home"}
        tabText={"tab"}
        left={true}
        textClass={textClass}
      />
      <Menu
        tab="explore"
        icon="search"
        text="Explore"
        tabText={"tab"}
        left={true}
        textClass={textClass}
      />
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
  );
};

// const Menu = ({ icon, text, tab = "home" }) => {
//   return (
//     <Link href={{ query: { tab } }}>
//       <div className="flex gap-3 cursor-pointer p-2 hover:bg-slate-100 rounded-xl dark:hover:bg-slate-600">
//         <Icon>{icon}</Icon>
//         <h3 className="flex-1 text-h2 font-semibold text-centerd">{text}</h3>
//       </div>
//     </Link>
//   );
// };

export default MainSideBar;
