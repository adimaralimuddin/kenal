import { useEffect, useState } from "react";
import useChat from "../../controls/useChat";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import { useAlert } from "../elements/Alert";
import ButtonPrim from "../elements/ButtonPrim";
import ButtonSec from "../elements/ButtonSec";
import Icon from "../elements/Icon";
import Option from "../elements/Option";
import Verifier from "../elements/Verifier";

export default function RelationAction({
  userId,
  passer,
  className,
  onChatClick,
  userSettings,
  showOptions = true,
}) {
  const { user } = useUser();

  const [allowChat, setAllowChat] = useState(false);

  const { followUser, listen, checkRelationPrivacy, checkChatPrivacy } =
    useRelations();
  const { openConver } = useChat();
  const { block } = useSettings();
  const [relation, setRelation] = useState();
  const [blocking, setBlocking] = useState(false);
  const [chatBlocking, setChatBlocking] = useState(false);
  const { open } = useAlert();

  const options = [
    {
      text: "block user",
      action: () => setBlocking(true),
    },
    {
      text: "block chats",
      action: () => setChatBlocking(true),
    },
  ];

  const onBlockUser = () => {
    if (!user) {
      return open("you must signin to block this user.");
    }
    block("blockedusers", userId);
  };
  const onBlockChat = () => {
    if (!user) {
      return open("you must signin to block this user.");
    }
    block("blockedchats", userId);
  };

  useEffect(() => {
    if (!passer || !userId || !user) return;
    const ret = listen(userId, (rel) => {
      setRelation(rel);
      passer?.(rel);
    });

    return () => ret?.();
  }, [userId, user, passer, userSettings]);

  useEffect(() => {
    if (!relation) return;
    checkRelationPrivacy(userId, relation, userSettings);
    setAllowChat(checkChatPrivacy(userId, relation, userSettings));
  }, [relation, userSettings]);

  const isFollower = (a = true, b = false) =>
    relation?.followers?.find((x) => x == user?.uid) ? a : b;

  const alertNoUser = () => {
    return open("you must signin to follow this user");
  };

  if (!userId || !user) return null;
  if (userId == user?.uid) return null;

  return (
    <div
      className={
        "flex items-center flex-wrap justify-end gap-3 w-full px-2 " + className
      }
    >
      <Verifier open={blocking} set={setBlocking} onYes={onBlockUser} />
      <Verifier open={chatBlocking} set={setChatBlocking} onYes={onBlockChat} />
      <ButtonPrim
        active={isFollower()}
        icon={isFollower("user-follow", "user-add")}
        className={"btn-prime flex-1 mx-1 p-2 "}
        onClick={(_) => {
          if (!user) {
            return alertNoUser();
          }
          followUser(userId, user?.uid);
        }}
      >
        {isFollower("following", "follow")}
      </ButtonPrim>
      {allowChat && (
        <Icon
          onClick={(_) => {
            if (!user) {
              return open("you must signin to chat with this user");
            }
            openConver([user?.uid, userId]);
            onChatClick?.();
          }}
          className="bg-sec p-2 text-primary-light dark:text-slate-100 font-semibold w-[38px] h-[38px] cursor-pointer"
        >
          chat-1
        </Icon>
      )}
      {showOptions && (
        <Option
          iconClass=" text-2xl ring-1 "
          userOnly={true}
          options={options}
        />
      )}
    </div>
  );
}
