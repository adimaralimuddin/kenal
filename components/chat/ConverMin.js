import Image from "next/image";
import { useEffect, useState } from "react";
import toolGetDoc from "../../controls/toolGetDoc";
import toolUpdatedoc from "../../controls/toolUpdateDoc";
import useChat from "../../controls/useChat";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";
import Icon from "../elements/Icon";
import IconBadge from "../elements/IconBadge";

function ConverMin({ converItem, className }) {
  const { conver, converse } = converItem;
  const chat = useChat();
  const [user, setUser] = useState();
  const [userProfile, setUserProfileData] = useState(null);
  const [active, setActive] = useState(false);
  const [incomingChats, setIncomingChats] = useState([]);
  const { listenProfile } = useUser();
  const chats = chat?.[converse?.id];
  const notifs = chats?.filter((c) => c?.seen === false);

  useEffect(() => {
    if (converse?.type === "private") {
      getUser2();
    }
  }, [conver]);

  useEffect(() => {
    if (!converse) return;
    const unsub = chat.listenConverseCat(converse);
    return () => {
      unsub?.();
    };
  }, [converse]);

  const setNotifsToSeen = () => {
    incomingChats?.length
      ? incomingChats?.map((unseenChat) => {
          toolUpdatedoc("notifs", unseenChat.id, { seen: true });
        })
      : null;
  };

  const getUser2 = async () => {
    return listenProfile(conver?.[1], (userSnap) => {
      setUserProfileData(userSnap);
    });
  };

  const photoUrl =
    converse?.type === "private" ? userProfile?.photoURL : converse?.photoURL;
  const displayName =
    converse?.type === "private" ? userProfile?.displayName : converse?.name;
  return (
    <div
      className={"relative z-10 flex items-center mr-3 " + className}
      onMouseLeave={(_) => setActive(false)}
      onMouseEnter={(_) => setActive(true)}
    >
      {incomingChats?.length > 0 && (
        <IconBadge value={incomingChats?.length} className="top-2 absolute" />
      )}

      {active && (
        <Icon
          className={` absolute z-10 bg-white rounded-full p-2 shadow-md -top-3 -right-3 max-w-[30px] max-h-[30px] min-w-[30px] min-h=[30px] flex items-center justify-center text-gray-500 cursor-pointer`}
          onClick={() => chat.removeConver(converse)}
        >
          close
        </Icon>
      )}
      <IconBadge value={notifs?.length} />

      <div
        onClick={(_) => {
          chat.openMiniConverse(converse);
          setNotifsToSeen();
        }}
        className={
          "flex flex-col items-center justify-center ring-[3px] ring-whited shadow-lg cursor-pointer overflow-hidden relative min-w-[50px] min-h-[50px] rounded-full bg-pink-400 " +
          (userProfile?.online
            ? " border-green-400 border-d[2px] ring-white dark:border-green-400  "
            : " ring-slate-200  opacity-70d")
        }
      >
        {photoUrl ? (
          <Image src={photoUrl} layout="fill" objectFit="cover" />
        ) : (
          <p className="text-lg font-semibold text-white first-letter:uppercase ">
            {displayName?.slice(0, 2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ConverMin;
