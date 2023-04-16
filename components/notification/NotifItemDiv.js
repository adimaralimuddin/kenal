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
  const { seenNotif, deleteNotif } = useNotifs();

  const onSeenHandler = () => {
    seenNotif(notif?.id);
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
        "flex items-center justify-between content-end flex-wrap rounded-lg min-h-[20px] p-1 text-slate-500 dark:text-slate-400 " +
        (notif.seen
          ? " hover:bg-slate-50 dark:hover:bg-slate-600 "
          : " bg-green-50 hover:bg-green-100  dark:bg-green-800 dark:hover:bg-green-700")
      }
    >
      {/* <div className="flex flex-col text-sm">
        <small>type: {notif?.type}</small>
        <small>subtype: {notif?.subtype}</small>
        <small>docId_:_ {notif?.docId}</small>
        <small>actionId :_ {notif?.actionId}</small>
      </div> */}
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
      <div className="flex items-center gap-1    ">
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
        {notif?.confirmed && !notif?.canceled && <ConfirmationText />}
        {notif?.canceled && <ConfirmationText text="Canceled By you" />}
        <div
          className={"px-3 flex gap-1 items-center " + (notif?.seen ? "" : "")}
        >
          {!notif?.seen && !confirmButtons && (
            <ActionButton onClick={onSeenHandler} />
          )}
          {((confirmButtons && notif?.confirmed) || true) && (
            <ActionButton
              icon="delete-bin-7"
              onClick={onDeleteHandler}
              className="text-pink-400"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotifItemDiv;

const ActionButton = ({ icon = "check", onClick, className }) => (
  <IconBtn
    onClick={(e) => {
      e.stopPropagation();
      onClick && onClick();
    }}
    className={"  text-[1rem] font-bold  " + className}
  >
    {icon}
  </IconBtn>
);

const ConfirmationText = ({ text = "Confirmed By you", icon = "check" }) => (
  <div className="flex gap-1 items-center text-sm text-blue-400">
    <Icon className="text-blue-400 dark:text-blue-500">{icon}</Icon>
    <p>{text}</p>
  </div>
);
