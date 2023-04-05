import React from "react";
import useNotifs from "../../controls/useNotifs";
import Icon from "../elements/Icon";
import IconBtn from "../elements/IconBtn";
import UserItem from "../user/UserItem";

const NotifItemDiv = ({
  notif,
  children,
  confirmButtons,
  onyes,
  onNo,
  yesText,
  noText,
  msg,
  icon,
}) => {
  const { seen, deleteNotif } = useNotifs();

  const onSeenHandler = () => {
    seen(notif?.id);
  };

  const onDeleteHandler = () => {
    deleteNotif(notif?.id);
  };
  return (
    <div
      onClick={(e) => {
        onSeenHandler();
      }}
      className={
        "flex items-center  rounded-lg min-h-[20px] p-1 " +
        (notif.seen
          ? " hover:bg-slate-50 dark:hover:bg-slate-600 "
          : " bg-green-50 hover:bg-green-100  dark:bg-green-800 dark:hover:bg-green-700")
      }
    >
      <header className="flex-1 flex gap-1 items-center ">
        {notif?.from && (
          <UserItem userId={notif.from} className="items-center flex">
            <p className="text-sm leading-3 text-slate-500  dark:text-slate-400">
              {msg || notif.msg || notif?.message}
            </p>
          </UserItem>
        )}

        {icon && <Icon>{icon}</Icon>}
        <p className="text-slate-600 dark:text-slate-300 font-medium text-sm ">
          {notif?.text}
        </p>
      </header>
      {confirmButtons && !notif?.confirmed && (
        <div className="flex gap-2">
          <button onClick={onyes} className="btn-prime">
            {yesText || "accept"}
          </button>
          <button onClick={onNo} className="btn-sec">
            {noText || "decline"}
          </button>
        </div>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={"px-3 flex gap-1  " + (notif?.seen ? "" : "")}
      >
        {!notif?.seen && !confirmButtons && (
          <IconBtn onClick={onSeenHandler} className={"  "}>
            check
          </IconBtn>
        )}
        {((confirmButtons && notif?.confirmed) || true) && (
          <IconBtn onClick={onDeleteHandler} className={"  "}>
            delete-bin-7
          </IconBtn>
        )}
      </div>
    </div>
  );
};

export default NotifItemDiv;
