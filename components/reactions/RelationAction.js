import { useEffect, useState } from "react";
import useConverseListeners from "../../controls/chats/converse/useConverseListeners";
import useMiniChat from "../../controls/chats/miniChat/useMiniChat";
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

  const {
    followUser,
    cancelRequest,
    listen,
    checkRelationPrivacy,
    checkChatPrivacy,
  } = useRelations();
  const { openMiniConverse } = useMiniChat();
  const { block } = useSettings();
  const [relation, setRelation] = useState();
  const [blocking, setBlocking] = useState(false);
  const [chatBlocking, setChatBlocking] = useState(false);
  const { getConverseItemByUsers } = useConverseListeners();
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
  const isInRequest = (a = true, b = false) =>
    relation?.request?.find((x) => x == user?.uid) ? a : b;

  const alertNoUser = () => {
    return open("you must signin to follow this user");
  };

  const onChatClickHandler = async () => {
    const converse = await getConverseItemByUsers([user.uid, userId]);
    openMiniConverse(converse);
    // openMiniConverse([user?.uid, userId]);
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

      {isInRequest(
        <ButtonPrim
          className="text-base px-3"
          onClick={() => {
            cancelRequest(userId);
          }}
        >
          cancel request
        </ButtonPrim>,
        <button
          onClick={(_) => {
            if (!user) {
              return alertNoUser();
            }
            followUser(userId, user?.uid);
          }}
          className={
            "text-base px-6 flex gap-2 " + isFollower("btn-sec", "btn-prime")
          }
        >
          <Icon
            className={
              "" +
              isFollower(
                "text-primary-light dark:text-slate-200",
                "text-white dark:text-white"
              )
            }
          >
            {isFollower("user-follow", "user-add")}
          </Icon>
          {isFollower("Following", "Follow")}
        </button>
        // <ButtonPrim
        //   active={isFollower()}
        //   icon={isFollower("user-follow", "user-add")}
        //   className={"btn-prime flex-1 mx-1 p-2 "}
        //   onClick={(_) => {
        //     if (!user) {
        //       return alertNoUser();
        //     }
        //     followUser(userId, user?.uid);
        //   }}
        // >
        //   {isFollower("following", "follow")}
        // </ButtonPrim>
      )}

      {allowChat && (
        <Icon
          onClick={(_) => {
            if (!user) {
              return open("you must signin to chat with this user");
            }
            onChatClickHandler();
            onChatClick?.();
          }}
          className="bg-sec p-2 dark:bg-slate-600 text-primary-light dark:text-slate-200 font-semiboldd min-w-[38px] min-h-[38px] cursor-pointer"
        >
          chat-1
        </Icon>
      )}
      {showOptions && (
        // <div className="bg-sec-light flex items-center justify-center  rounded-full  min-w-[38px] min-h-[38px]">
        <Option iconClass=" " userOnly={true} options={options} />
        // </div>
      )}
    </div>
  );
}
