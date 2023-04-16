import { useEffect, useState } from "react";
import useMiniChat from "../../controls/chats/miniChat/useMiniChat";
import UseMiniChatStore from "../../controls/chats/miniChat/useMiniChatStore";
import useChatListeners from "../../controls/chats/useChatListeners";
import toolGetDoc from "../../controls/toolGetDoc";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";
import Avatars from "../elements/Avatars";
import Box from "../elements/Box";
import Icon from "../elements/Icon";
import MessageFeeds from "../messages/MessageFeeds";
import ConverseItem from "../messages/conver/ConverseItem";
import UserItem from "../user/UserItem";

export default function ConverItem({ converItem, ind, width }) {
  const { conver, converse } = converItem;
  const { listenConverseChat } = useChatListeners();
  const store = UseMiniChatStore();
  const { user } = useUser();
  const chat = useMiniChat();
  const [minimized, setMinimized] = useState(false);
  const chats = chat?.[converse?.id];

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
    checkPrivacy();
  }, [conver]);

  useEffect(() => {
    if (!converse) return;
    const unsub = listenConverseChat(converse, (chatsSnap) => {
      store.set({ [converse.id]: chatsSnap });
    });
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

  if (minimized) {
    return null;
  }

  return (
    <Box className="flex mx-2 flex-col shadow-lg shadow-indigo-200 dark:shadow-none max-w-[300px] max-h-[200px]d ring-1 ring-slate-200 min-w-[150px]d min-h-[550px] px-0 py-0  ">
      <div className="flex items-centerd justify-between pr-1 max-h-[200px]">
        {converse?.type === "private" && (
          <UserItem
            userId={conver[1]}
            dnoName="on"
            fpop={false}
            par=" -left-5"
          />
        )}
        {converse?.type === "group" && (
          <div className="flex-1 overflow-x-auto">
            <ConverseItem
              conver={converse}
              noAvatars={true}
              allowMiniChat={false}
            />
          </div>
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
      <MessageFeeds
        feedId={converse?.id}
        converse={converse}
        chats={chats}
        feedClassName={" max-h-[75vh] "}
      />
    </Box>
  );
}

// function GroupCaption({ converse }) {
//   return (
//     <div className="text-center flex flex-col items-center text-gray-500 py-4 mb-3">
//       <Avatar
//         src={converse?.photoURL}
//         size={70}
//         userName={converse?.name}
//         className="rounded-full"
//       />
//       <p className="font-semibold text-gray-700 dark:text-slate-400">
//         {converse?.name}
//       </p>
//       <Avatars userIds={converse?.members} />
//     </div>
//   );
// }
// function Caption({ userId }) {
//   const [profile, setProfile] = useState();
//   useEffect(() => {
//     toolGetDoc("profile", userId, setProfile);
//   }, [userId]);
//   return (
//     <div className="text-center flex flex-col items-center text-gray-500 py-4 mb-3">
//       <Avatar
//         src={profile?.photoURL}
//         size={70}
//         userName={profile?.userName || profile?.email}
//         className="rounded-full"
//       />
//       <p className="font-semibold text-gray-700">{profile?.displayName}</p>
//       <small>{profile?.data?.bio}</small>
//       {profile?.data?.country && (
//         <small>Lives in {profile?.data?.country}</small>
//       )}
//     </div>
//   );
// }
