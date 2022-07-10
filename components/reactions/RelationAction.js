import { useEffect, useState } from "react";
import useChat from "../../controls/useChat";
import useRelations from "../../controls/useRelations";
import useUser from "../../controls/useUser";
import ButtonPrim from "../elements/ButtonPrim";
import ButtonSec from "../elements/ButtonSec";

export default function RelationAction({
  userId,
  passer,
  className,
  onChatClick,
}) {
  const { user } = useUser();
  if (userId == user?.uid) return null;

  const { followUser, listen } = useRelations();
  const { openConver } = useChat();
  const [relation, setRelation] = useState();

  useEffect(() => {
    if (passer && userId && user) {
      listen(userId, (rel) => {
        setRelation(rel);
        passer?.(rel);
      });
    }
  }, [userId, user, passer]);

  const isFollower = (a = true, b = false) =>
    relation?.followers?.find((x) => x == user?.uid) ? a : b;

  return (
    <div
      className={
        "flex items-center flex-wrap justify-between w-full mx-auto max-w-md px-2 " +
        className
      }
    >
      <ButtonPrim
        active={isFollower()}
        icon={isFollower("user-follow", "user-add")}
        className={"flex-1 mx-1 p-2 "}
        onClick={(_) => followUser(userId, user?.uid)}
      >
        {isFollower("following", "follow")}
      </ButtonPrim>
      <ButtonSec
        icon="chat-1"
        onClick={(_) => {
          openConver([user?.uid, userId]);
          onChatClick?.();
        }}
        className="flex-1 mx-1 p-2 text-md px-5"
      >
        Chat
      </ButtonSec>
      <ButtonSec
        type="fill"
        icon="more"
        className=" bg-gray-100 dark:bg-slate-700 px-1 ring-1 mx-1 hover:bg-gray-200 hover:ring-gray-300 self-stretch ring-gray-200"
      />
    </div>
  );
}
