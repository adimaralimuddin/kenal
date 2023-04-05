import React, { useEffect, useRef, useState } from "react";
import UseMessages from "../../controls/chats/useMessages";
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
}) => {
  const [converseSnap, setConverseSnap] = useState();
  const [chatSnaps, setChatSnaps] = useState();
  const msg = UseMessages();
  const ref = useRef(null);
  const { user } = useUser();
  const chatsLists = chats || chatSnaps;
  const toUserId = () => converse?.members?.filter((u) => u !== user?.uid)?.[0];

  useEffect(() => {
    const unsubChats = msg.listenConverseChats(converse, (snap) => {
      setChatSnaps(snap);
      onChatsSnap && onChatsSnap(snap);
    });
    const unsub = msg.listenConverseItem(converse, (snap) => {
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

  const onPostHandler = ({ body, imgs }) => {
    const data = {
      body,
      converseId: converse.id,
      userId: [user.uid],
    };
    msg.addChat({ data, imgs, converse: converseSnap }, () => {
      scrollToBottom();
    });
  };
  return (
    <div className="flex-1 flex flex-col">
      <a ref={ref} href={"#" + feedId}></a>
      <div className="flex-1 max-h-[350px] overflow-y-auto p-3 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700">
        {converse?.type === "group" && <GroupCaption converse={converse} />}
        {converse?.type === "private" && <Caption userId={toUserId()} />}
        {chatsLists?.map((chatItemData) => (
          <ChatItem data={chatItemData} key={chatItemData?.id} />
        ))}
        <div id={feedId}></div>
      </div>
      <footer>
        <Writer onPost={onPostHandler} user={user} small="on" text="reply" />
      </footer>
    </div>
  );
};

export default MessageFeeds;

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
    console.log("userid", userId);
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
