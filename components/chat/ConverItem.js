import { useEffect, useState } from "react";
import useChat from "../../controls/useChat";
import Box from "../elements/Box";
import ChatItem from "./ChatItem";
import Writer from "../elements/Writer";
import useUser from "../../controls/useUser";
import UserItem from "../user/UserItem";
import Icon from "../elements/Icon";
import Avatar from "../elements/Avatar";
import toolGetDoc from "../../controls/toolGetDoc";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import useNotifs from "../../controls/useNotifs";
import useSettings from "../../controls/useSettings";

export default function ConverItem({ converItem, ind, width }) {
  const { conver, id: converId } = converItem;
  const { user } = useUser();
  const {
    addChat,
    minimizeConver,
    closeConver,
    removeConver,
    checkChatPrivacy,
    set,
  } = useChat();
  const [minimized, setMinimized] = useState(false);
  const [chats, setChats] = useState([]);
  const { addNotif } = useNotifs();
  const { getUserSettings } = useSettings();

  useEffect(() => {
    check();
  }, [width, conver]);

  function check() {
    if (ind >= 3) {
      setMinimized(true);
      minimizeConver(conver);
    }

    if (ind == 2) {
      if (window?.innerWidth < 1100) {
        setMinimized(true);
        minimizeConver(conver);
      } else {
        setMinimized(false);
        minimizeConver(conver, false);
      }
    }

    if (ind == 1) {
      if (window?.innerWidth < 700) {
        setMinimized(true);
        minimizeConver(conver);
      } else {
        minimizeConver(conver, false);
        setMinimized(false);
      }
    }
  }


  // const checkPrivacy = () => {
    
  // }

  useEffect(() => {
    // const u = getUserSettings(conver?.[1]);
    // console.log("useru ", u);

    const q = query(
      collection(db, "chats"),
      where("converId", "in", [conver?.[1] + conver?.[0], conver?.join("")]),
      orderBy("timestamp", "asc")
    );

    onSnapshot(q, (snap) => {
      setChats(snap?.docs?.map((d) => ({ ...d.data(), id: d.id })));
    });
  }, [conver]);

  useEffect(() => {
    checkPrivacy();
  }, [conver]);

  async function checkPrivacy() {
    const privacy = await checkChatPrivacy(conver);
    if (!privacy) {
      set((p) => {
        const convers = p?.convers?.filter((p) => p?.id !== converId);
        return { convers };
      });
    }
  }

  async function onAddChat({ body, imgs }, clear) {
    checkPrivacy();
    const chat = await addChat(
      {
        data: {
          conver,
          body,
          converId: conver[0] + conver[1],
          userId: [user?.uid],
        },
        imgs,
      },
      clear
    );
    console.log("chat ", chat);
    addNotif(conver[1], user?.uid, "chat", conver?.toString());
  }

  if (minimized) {
    return null;
  }

  return (
    <Box className="flex mx-2 flex-col shadow-lg max-w-[300px] max-h-[90vh] ring-1 ring-gray-200 min-w-[150px]d min-h-[200px] px-0 py-0  ">
      <p>open: {converItem?.open?.toString()}</p>
      <div className="flex items-center justify-between pr-1">
        <UserItem userId={conver[1]} dnoName="on" fpop={false} par=" -left-5" />
        <div className="flex items-center ">
          <Icon
            onClick={(_) => closeConver(conver)}
            className="ring-1d rounded-full cursor-pointer"
          >
            subtract
          </Icon>
          <Icon
            onClick={(_) => removeConver(conver)}
            className="ring-1d rounded-full cursor-pointer"
          >
            close
          </Icon>
        </div>
      </div>
      <hr />
      <div className="flex-1 p-2 max-h-[70vh] overflow-y-auto flex flex-col">
        <Caption userId={conver?.[1]} />
        {chats?.map((chat) => (
          <ChatItem data={chat} key={chat?.id} />
        ))}
      </div>
      <hr />

      <Writer
        onPost={onAddChat}
        text="reply"
        user={user}
        small="on"
        className="p-1 ring-1d"
      />
    </Box>
  );
}

function Caption({ userId }) {
  const [profile, setProfile] = useState();
  useEffect(() => {
    toolGetDoc("profile", userId, setProfile);
  }, [userId]);
  return (
    <div className="text-center flex flex-col items-center text-gray-500 py-4 mb-3">
      <Avatar
        src={profile?.photoURL}
        size={70}
        userName={profile?.userName || profile?.email}
        className="rounded-full"
      />
      <p className="font-semibold text-gray-700">{profile?.displayName}</p>
      <small>{profile?.data?.bio}</small>
      {profile?.data?.country && (
        <small>Lives in {profile?.data?.country}</small>
      )}
    </div>
  );
}
