import React, { useEffect, useRef, useState } from "react";
import useConverseListeners from "../../controls/chats/converse/useConverseListeners";
import useMessageStore from "../../controls/chats/messages/useMessageStore";
import useChatAdder from "../../controls/chats/useChatAdder";
import useChatListeners from "../../controls/chats/useChatListeners";
import toolGetDoc from "../../controls/toolGetDoc";
import useUser from "../../controls/useUser";
import ChatItem from "../chat/ChatItem";
import Avatar from "../elements/Avatar";
import Avatars from "../elements/Avatars";
import Writer from "../elements/Writer";

const MessageFeeds = ({
  converse,
  chats,
  onChatsSnap,
  onConverseSnap,
  feedId = "messageFeed",
  feedMaxHeight,
  feedClassName,
}) => {
  const [converseSnap, setConverseSnap] = useState();
  const [chatSnaps, setChatSnaps] = useState();
  const { listenConverseItem } = useConverseListeners();
  const { addChat } = useChatAdder();
  const { listenConverseChat } = useChatListeners();
  const ref = useRef(null);
  const { user } = useUser();
  const chatsLists = chats || chatSnaps;
  const toUserId = () => converse?.members?.filter((u) => u !== user?.uid)?.[0];
  useEffect(() => {
    const unsubChats = listenConverseChat(converse, (snap) => {
      setChatSnaps(snap);
      onChatsSnap && onChatsSnap(snap);
    });
    const unsub = listenConverseItem(converse, (snap) => {
      setConverseSnap(snap);
      onConverseSnap && onConverseSnap(snap);
    });
    return () => {
      unsub();
      unsubChats();
    };
  }, [converse]);

  useEffect(() => scrollToBottom(), [chatsLists, converseSnap]);

  const scrollToBottom = () => {
    if (ref.current && chatsLists && converseSnap) {
      ref.current?.click();
    }
  };

  const onPostHandler = ({ body, imgs }, clear) => {
    const data = {
      body,
      converseId: converse.id,
    };
    addChat({ data, imgs, converse: converseSnap }, () => {
      clear();
      scrollToBottom();
    });
  };

  return (
    <div
      style={{ maxHeight: feedMaxHeight }}
      className="flex-1 box p-0  flex flex-col  "
    >
      <a ref={ref} href={"#" + feedId}></a>
      <div className="flex-1  relative">
        <div
          className={
            "flex-1 flex  absolute top-0 left-0 h-full w-full flex-col overflow-y-auto p-3 bg-slate-100 bg-red-400d dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 " +
            feedClassName
          }
        >
          {converse?.type === "group" && <GroupCaption converse={converse} />}
          {converse?.type === "private" && <Caption userId={toUserId()} />}
          {chatsLists?.map((chatItemData) => (
            <ChatItem data={chatItemData} key={chatItemData?.id} />
          ))}
          <div id={feedId}></div>
        </div>
      </div>

      <Writer
        // converse={converse}
        onPost={onPostHandler}
        autoFocus={true}
        small="on"
        text="reply"
      />
    </div>
  );
};

export default MessageFeeds;

function Feeds({ converse, onConverseSnap, onChatsSnap, chats, feedId }) {
  const [converseSnap, setConverseSnap] = useState();
  const [chatSnaps, setChatSnaps] = useState();
  const { listenConverseItem } = useConverseListeners();
  const { listenConverseChat } = useChatListeners();
  const ref = useRef(null);

  const toUserId = () => converse?.members?.filter((u) => u !== user?.uid)?.[0];
  const chatsLists = chats || chatSnaps;

  useEffect(() => {
    const unsubChats = listenConverseChat(converse, (snap) => {
      setChatSnaps(snap);
      onChatsSnap && onChatsSnap(snap);
    });
    const unsub = listenConverseItem(converse, (snap) => {
      setConverseSnap(snap);
      console.log("snap", snap);
      onConverseSnap && onConverseSnap(snap);
    });
    return () => {
      unsub();
      unsubChats();
    };
  }, [converse]);

  useEffect(() => scrollToBottom(), [chatsLists, converseSnap]);

  const scrollToBottom = () => {
    if (ref.current && chatsLists && converseSnap) {
      ref.current?.click();
    }
  };
  return (
    <div className="flex-1 overflow-y-auto p-3 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
      <a ref={ref} href={"#" + feedId}></a>

      {converse?.type === "group" && <GroupCaption converse={converse} />}
      {converse?.type === "private" && <Caption userId={toUserId()} />}
      {chatsLists?.map((chatItemData) => (
        <ChatItem data={chatItemData} key={chatItemData?.id} />
      ))}
      <div id={feedId}></div>
    </div>
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
    if (!userId) return;
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
