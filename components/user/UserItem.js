import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";
import UserInfoPop from "./UserInfoPop";

export default function UserItem({
  userId,
  children,
  noName,
  noImg,
  className,
  textClass = " text-slate-600 dark:text-slate-400 inline -block font-semibold text-sm  underline-offset-1 ",
  small,
  pop = true,
  size,
  par,
  passer = () => {},
  inlineText,
  after,
  postUserSettings,
  nameClass,
  defaultUser,
}) {
  const [userProfileData, setUserProfileData] = useState(defaultUser);
  const [open, setOpen] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const { listenProfile } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;
    const unsub = listenProfile(userId, (profileSnap) => {
      setUserProfileData(profileSnap);
      passer(profileSnap);
    });
    return () => {
      unsub?.();
    };
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
      className={"  flex items-center " + className}
    >
      <UserInfoPop
        par={" -top-5 pt-12 " + par}
        div=" shadow-xl rounded-xl "
        show={showPop}
        postUserSettings={postUserSettings}
        open={open && pop}
        set={setOpen}
        userId={userId}
        data={userProfileData}
      />
      {!noImg && (
        <Link href={{ query: { ...router?.query, userId, tab: "profile" } }}>
          <div className="flex ">
            <Avatar
              className="cursor-pointer "
              // onMouseOver={toOpen}
              src={userProfileData?.photoURL}
              userName={userProfileData?.displayName}
              size={size || (small ? 30 : 35)}
            />
            {userProfileData?.online && (
              <span className="relative">
                <div className=" absolute top-0 right-0  bg-green-400 p-[3px] rounded-full"></div>
              </span>
            )}
          </div>
        </Link>
      )}
      {!noName && (
        <div
          className={" overflow-visible " + (!noImg && " ml-2 ") + nameClass}
        >
          <Link
            href={{ pathname: "/feed", query: { userId, tab: "profile" } }}
            dhref={`/user/${userId}`}
          >
            <h2
              onMouseEnter={toOpen}
              className={
                textClass +
                (small && " text-smd ") +
                (pop && " hover:underline cursor-pointer dark:text-slate-300 ")
              }
            >
              {userProfileData?.displayName}
              {inlineText}
            </h2>
          </Link>

          {children}
        </div>
      )}
      {after && after}
    </div>
  );
}
