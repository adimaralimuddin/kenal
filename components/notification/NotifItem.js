import { useEffect, useState } from "react";
import toolGetDoc from "../../controls/toolGetDoc";
import UserItem from "../user/UserItem";
import NotifItemChat from "./NotifItemChat";
import NotifItemDiv from "./NotifItemDiv";
import NotifItemFollow from "./NotifItemFollow";
import NotifItemLikePost from "./NotifItemLikePost";
import NotifItemMessageRequest from "./NotifItemMessageRequest";
import NotifPost from "./notifPosts/NotifPost";
import NotifProfile from "./notifProfiles/NotifProfile";

export default function NotifItem({ notif }) {
  switch (notif?.type) {
    case "message":
      return <NotifItemMessageRequest notif={notif} />;
    case "profile":
      return <NotifProfile notif={notif} />;
    case "post":
      return <NotifPost notif={notif} />;
    case "comment":
      return <NotifPost notif={notif} />;
    case "reply":
      return <NotifPost notif={notif} />;
    // case "chat":
    //   return <NotifItemChat notif={notif} />;
    // case "follow":
    //   return <NotifItemFollow notif={notif} />;
    // case "like-post":
    //   return <NotifItemLikePost notif={notif} />;
    default:
      return (
        <div>
          type: {notif?.type}
          <NotifItemDiv
            notif={notif}
            msg={`type: ${notif?.type} / subtype: ${notif?.subtype} / notif: ${notif?.notif}`}
          />
        </div>
      );
  }
}

export function NotifMessage({ data, length, from, lists, isSeen }) {
  const [secondPerson, setSecondPerson] = useState(null);
  useEffect(() => {
    if (length == 2) {
      getSecondPerson();
    } else {
      setSecondPerson(null);
    }
  }, [length]);

  async function getSecondPerson() {
    const sec = await toolGetDoc(
      "users",
      lists?.filter((p) => p != data?.from)?.[0]
    );
    setSecondPerson(sec);
  }
  return (
    <div className={"flex items-center text-smd z-50"}>
      <UserItem small="on" userId={from} pop={false}>
        <small className="text-slate-600 dark:text-slate-500 leading-[1]">
          {secondPerson && " and "}
          {secondPerson && (
            <span className="font-semibold text-slate-600 dark:text-slate-500 hover:underline">
              {secondPerson?.userName}
            </span>
          )}
          {length > 2 && ` and ${length - 1} others `}
          {" " + data?.message}
        </small>
      </UserItem>
    </div>
  );
}
