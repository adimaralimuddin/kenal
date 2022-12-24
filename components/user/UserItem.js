import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import Avatar from "../elements/Avatar";
import UserInfoPop from "./UserInfoPop";
import Link from "next/link";

export default function UserItem({
  userId,
  children,
  noName,
  noImg,
  className,
  textClass = " text-slate-600 dark:text-slate-400 inline -block dwhitespace-nowrap   font-semibold text-sm  underline-offset-1 ",
  small,
  pop = true,
  size,
  par,
  passer = () => {},
  inlineText,
  postUserSettings,
}) {
  const [data_, setData] = useState();
  const [open, setOpen] = useState(false);
  const [showPop, setShowPop] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const ret = onSnapshot(doc(db, "users", userId), (snap) => {
      const nData = { ...snap?.data(), id: snap?.id };
      setData(nData);
      passer(nData);
    });

    return () => ret();
  }, [userId]);

  function toOpen(e) {
    setTimeout(() => {
      setOpen(true);
    }, 600);
  }

  return (
    <div
      onMouseEnter={(_) => {
        setShowPop(true);
        setOpen(false);
      }}
      onMouseLeave={(_) => {
        setOpen(false);
        setShowPop(false);
      }}
      className={"  flex items-center p-1 " + className}
    >
      <UserInfoPop
        par={" -top-5 pt-12 " + par}
        div=" shadow-xl rounded-xl "
        show={showPop}
        postUserSettings={postUserSettings}
        open={open && pop}
        set={setOpen}
        userId={userId}
        data={data_}
      />
      {!noImg && (
        <div className="flex ">
          <Avatar
            className="cursor-pointer "
            onMouseOver={toOpen}
            src={data_?.avatar}
            userName={data_?.userName}
            size={size || (small ? 30 : 35)}
          />
          {data_?.online && (
            <span className="relative">
              <div className=" absolute top-0 right-0 ring-2 ring-white bg-pink-400 p-1 rounded-full"></div>
            </span>
          )}
        </div>
      )}
      {!noName && (
        <div
          className={
            " flexd flex-cold justify-startd overflow-visible " +
            (!noImg && " ml-2 ")
          }
        >
          <Link href={`/user/${userId}`}>
            <h2
              onMouseEnter={toOpen}
              className={
                textClass +
                (small && " text-smd ") +
                (pop && " hover:underline cursor-pointer ")
              }
            >
              {data_?.userName}
              {inlineText}
            </h2>
          </Link>
          {children}
        </div>
      )}
    </div>
  );
}
