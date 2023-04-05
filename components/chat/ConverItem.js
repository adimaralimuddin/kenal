import { useEffect, useState } from "react";
import UseMessages from "../../controls/chats/useMessages";
import toolGetDoc from "../../controls/toolGetDoc";
import useChat from "../../controls/useChat";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";
import Avatars from "../elements/Avatars";
import Box from "../elements/Box";
import Icon from "../elements/Icon";
import Writer from "../elements/Writer";
import MessageFeeds from "../messages/MessageFeeds";
import ConverseItem from "../messages/conver/ConverseItem";
import UserItem from "../user/UserItem";
import ChatItem from "./ChatItem";

export default function ConverItem({ converItem, ind, width }) {
  const { conver, converse } = converItem;
  const { user } = useUser();
  const chat = useChat();
  const [minimized, setMinimized] = useState(false);
  const msg = UseMessages();
  const chats = chat?.[converse?.id];
  const [converseSnap, setConverseSnap] = useState();

  useEffect(() => {
    check();
  }, [width, conver]);

  function check() {
    if (ind >= 3) {
      setMinimized(true);
      chat.minimizeConver(converse);
    }

    if (ind == 2) {
      if (window?.innerWidth < 1100) {
        setMinimized(true);
        chat.minimizeConver(converse);
      } else {
        setMinimized(false);
        chat.minimizeConver(converse, false);
      }
    }

    if (ind == 1) {
      if (window?.innerWidth < 700) {
        setMinimized(true);
        chat.minimizeConver(converse);
      } else {
        chat.minimizeConver(converse, false);
        setMinimized(false);
      }
    }
  }

  useEffect(() => {
    // chat.openConverseData(converse);
    // msg.listenConverseItem(converse, setConverseSnap);
    checkPrivacy();
  }, [conver]);

  useEffect(() => {
    if (!converse) return;
    const unsub = chat.listenConverseCat(converse);
    return () => {
      unsub?.();
    };
  }, [converse]);

  async function checkPrivacy() {
    const privacy = await chat.checkChatPrivacy(converse?.members);
    if (!privacy) {
      chat.set((p) => {
        const convers = p?.convers?.filter((p) => p?.id !== converItem.id);
        return { convers };
      });
    }
  }

  // const onPostHandler = async ({ body, imgs }, clear) => {
  //   const data = {
  //     body,
  //     converseId: converse.id,
  //     userId: [user.uid],
  //   };
  //   await msg.addChat({ data, imgs, converse: converseSnap });
  //   clear();
  // };

  if (minimized) {
    return null;
  }

  return (
    <Box className="flex mx-2 flex-col shadow-lg shadow-indigo-200 dark:shadow-none max-w-[300px] max-h-[90vh] ring-1 ring-slate-200 min-w-[150px]d min-h-[200px] px-0 py-0  ">
      <div className="flex items-center justify-between pr-1">
        {converse?.type === "private" && (
          <UserItem
            userId={conver[1]}
            dnoName="on"
            fpop={false}
            par=" -left-5"
          />
        )}
        {converse?.type === "group" && (
          <ConverseItem
            conver={converse}
            noAvatars={true}
            allowMiniChat={false}
          />
        )}
        <div className="flex items-center ">
          <Icon
            onClick={() => chat.closeConver(converse)}
            className="ring-1d rounded-full cursor-pointer"
          >
            subtract
          </Icon>
          <Icon
            onClick={() => chat.removeConver(converse)}
            className="ring-1d rounded-full cursor-pointer"
          >
            close
          </Icon>
        </div>
      </div>
      <MessageFeeds feedId={converse?.id} converse={converse} chats={chats} />
      {/* <div className="flex-1 p-2 max-h-[70vh] overflow-y-auto flex flex-col bg-slate-100 dark:bg-black">
        {converse?.type === "group" && <GroupCaption converse={converse} />}
        {converse?.type === "private" && <Caption userId={conver?.[1]} />}
        {chats?.map((chatItemData) => (
          <ChatItem data={chatItemData} key={chatItemData?.id} />
        ))}
      </div> */}
      {/* <Writer
        onPost={onPostHandler}
        text="reply"
        user={user}
        small="on"
        className="p-1 ring-1d"
      /> */}
    </Box>
  );
}

function GroupCaption({ converse }) {
  return (
    <div className="text-center flex flex-col items-center text-gray-500 py-4 mb-3">
      <Avatar
        src={converse?.photoURL}
        size={70}
        userName={converse?.name}
        className="rounded-full"
      />
      <p className="font-semibold text-gray-700 dark:text-slate-400">
        {converse?.name}
      </p>
      <Avatars userIds={converse?.members} />
    </div>
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
