import { useEffect, useState } from "react";
import useNotifs from "../../controls/useNotifs";
import useUser from "../../controls/useUser";
import Icon from "../elements/Icon";
import IconBadge from "../elements/IconBadge";
import UserItem from "../user/UserItem";
import toolRemoveDoc from "../../controls/toolRemoveDoc";
import toolGetDoc from "../../controls/toolGetDoc";
import { useRouter } from "next/router";
import useChat from "../../controls/useChat";

export default function NotificationMain() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const { listen } = useNotifs();
  const { user } = useUser();
  const router = useRouter();
  const { openConver, convers } = useChat();

  useEffect(() => {
    updateNotifs();
  }, [convers]);

  const updateNotifs = (notifs_ = notifs) => {
    const filteredNotifs = notifs_?.map((n) => {
      if (n?.type == "chat") {
        convers?.map((c) => {
          if (c?.conver?.find((i) => i == n?.from)) {
            // console.log("conver", c);
            if (c?.open) {
              // console.log("conver opene");
              n.seen = true;
              // console.log("n set seen to true ", n);
            }
          }
        });
      }
      return n;
    }); // end of filtered notifs
    return filteredNotifs;
  };

  useEffect(() => {
    const ret = listen(user?.uid, (notifs_) => {
      // console.log("convers", convers);
      setNotifs(updateNotifs(notifs_));
    });
    return ret;
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="">
      <span>
        <IconBadge
          value={notifs?.filter?.((p) => !p.seen)?.length}
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
              <NotifItem
                data={notif}
                key={notif?.id}
                setOpen={setOpen}
                router={router}
                openConver={openConver}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NotifItem({ data, setOpen, router, openConver }) {
  const { seen } = useNotifs();
  const { lists, type } = data;
  const length = data?.lists?.length;

  const icon = () => {
    if (type?.includes("unlike")) {
      return "thumb-down";
    } else if (type?.includes("like")) {
      return "thumb-up";
    } else if (type?.includes("unlove")) {
      return "heart-pulse";
    } else if (type?.includes("love")) {
      return "hearts";
    } else if (type?.includes("comment")) {
      return "wechat";
    } else if (type?.includes("mention")) {
      return "user-voice";
    } else if (type?.includes("unfollow")) {
      return "user-unfollow";
    } else if (type?.includes("chat")) {
      return "heart";
    } else if (type?.includes("follow")) {
      return "user-follow";
    }
  };

  const iconColor = () => {
    if (
      type?.includes("unlike") ||
      type?.includes("unlove") ||
      type?.includes("unfollow")
    ) {
      return "text-gray-400";
    } else if (type?.includes("comment")) {
      return "text-green-400";
    } else {
      return "text-pink-400";
    }
  };

  useEffect(() => {
    return () => {
      seen(data?.id);
    };
  }, []);

  const isSeen = (a = true, b = false) => (data?.seen ? a : b);

  const onClick = () => {
    if (type?.includes("chat")) {
      console.log(data);
      setOpen(false);
      openConver([data?.to, data?.from]);
    } else {
      setOpen(false);
      router.push("/" + data?.url);
    }
  };

  return (
    // <Link href={"/" + data?.url}>
    <div
      className={
        "flex items-center border-b-[1px]   px-2 cursor-pointer " +
        isSeen(
          "bg-slate-100 dark:bg-d2 text-gray-600 dark:text-gray-400 opacity-90 border-white dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-d3 ",
          "bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-d6 px-2 border-slate-100  dark:border-slate-600"
        )
      }
      onClick={onClick}
    >
      <Icon className={iconColor()}>{icon()}</Icon>
      <Message
        data={data}
        length={length}
        from={data?.from}
        lists={lists}
        isSeen={isSeen}
      />
      <span
        className="px-2 bg-red-2d00 ml-auto"
        onClick={(e) => {
          e.stopPropagation();
          if (!data?.id) return;
          toolRemoveDoc("notifs", data?.id);
        }}
      >
        <Icon>delete-bin</Icon>
      </span>
    </div>
    // </Link>
  );
}

function Message({ data, length, from, lists, isSeen }) {
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
    <div className={"flex items-center text-smd z-50 "}>
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
