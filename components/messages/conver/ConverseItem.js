import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useMiniChat from "../../../controls/chats/miniChat/useMiniChat";
import useChatListeners from "../../../controls/chats/useChatListeners";
import toolGetDoc from "../../../controls/toolGetDoc";
import useUser from "../../../controls/useUser";
import ToolTextWrapper from "../../../controls/utils/toolTextWrapper";
import Avatar from "../../elements/Avatar";
import Avatars from "../../elements/Avatars";
import Badge from "../../elements/Badge";
import IconBtn from "../../elements/IconBtn";
import UserItem from "../../user/UserItem";

const ConverseItem = ({
  conver,
  onClick,
  noAvatars = false,
  noIcon = false,
  noMembers = false,
  allowMiniChat = true,
}) => {
  const { user } = useUser();
  const router = useRouter();
  const { listenConverseChat } = useChatListeners();
  const chat = useMiniChat();
  const [chats, setChats] = useState([]);
  const notifs = chats?.filter(
    (c) => c?.seen === false && c?.userId !== user?.uid
  );
  const onSelectHandler = () => {
    onClick && onClick(conver);
  };
  const [toUser, setToUser] = useState();
  function isPrivate(yes = true, no = false) {
    if (conver?.type === "private") {
      return yes;
    }
    return no;
  }

  const toUserId = () =>
    conver?.members?.filter((uid) => uid !== user?.uid)?.[0];

  useEffect(() => {
    if (conver?.type === "private") {
      toolGetDoc("profile", toUserId(), setToUser);
    }
    const unsub = listenConverseChat(conver, setChats);
    return unsub;
  }, [conver, user]);

  const query = {
    ...router.query,
    tab: "messages",
    converseId: conver?.id,
    messageTab: "all",
  };
  return (
    <Link href={{ query }} scroll={false}>
      <div
        onClick={onSelectHandler}
        className=" flex flex-col gap-1 justify-between  "
      >
        <div className="group relative flex flex-1 rounded-lg items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer">
          <Badge className="-left-2 -top-5 " value={notifs?.length} />

          {conver?.type === "private" && (
            <UserItem
              userId={toUserId()}
              noName={true}
              after={
                <div className="leading-4 px-1">
                  <h3 className="text-[0.9rem] font-medium dark:text-slate-400 ">
                    {isPrivate(toUser?.displayName, conver?.name)}
                  </h3>
                  <small className="text-slate-400 whitespace-nowrap">
                    {conver?.lastUserId === user?.uid && (
                      <span className="pr-1 text-indigo-400 font-medium">
                        You:
                      </span>
                    )}
                    {ToolTextWrapper(conver?.lastChatBody, 35)}
                  </small>
                </div>
              }
            />
          )}
          {conver?.type === "group" && (
            <Avatar
              src={conver?.photoURL}
              userName={
                conver?.type === "private" ? toUser?.displayName : conver?.name
              }
              size={20}
            />
          )}

          <div className="flex-1 flex gap-1 items-center overflow-hidden">
            {conver?.type === "group" && (
              <div className="leading-4 px-1 whitespace-nowrap overflow-hidden">
                <h3 className="text-[0.9rem] font-medium  ">
                  {isPrivate(toUser?.displayName, conver?.name)}
                </h3>
                <small className="text-slate-400">
                  {conver?.lastUserId === user?.uid && (
                    <span className="pr-1 text-indigo-400 font-medium">
                      You:
                    </span>
                  )}
                  {conver?.lastChatBody}
                </small>
              </div>
            )}

            {!noMembers && conver?.type === "group" && (
              <small className="whitespace-nowrap pr-2 ">
                ({conver?.members?.length})
              </small>
            )}
          </div>
          <div className="px-1 flex items-center absolute right-0 ">
            {allowMiniChat && (
              <IconBtn
                onClick={(e) => {
                  e.stopPropagation();
                  chat.openMiniConverse(conver);
                }}
                className="group-hover:visible invisible"
              >
                chat-3
              </IconBtn>
            )}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {!noAvatars && conver?.type === "group" && (
            <Avatars userIds={conver?.members} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ConverseItem;
