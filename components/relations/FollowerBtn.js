import React, { useEffect, useState } from "react";
import useRelations from "../../controls/useRelations";
import useUser from "../../controls/useUser";
import Icon from "../elements/Icon";

const FollowerBtn = ({ toUser }) => {
  const { user } = useUser();
  const {
    listen: listenRelations,
    followUser,
    isFollowings,
    isRequesting,
    cancelRequest,
  } = useRelations();
  const [relation, setRelation] = useState(null);

  useEffect(() => {
    if (!user?.uid || !toUser || !listenRelations) return;

    const unSub = listenRelations(toUser?.id, (relationSnap) => {
      setRelation(relationSnap);
    });
    return () => {
      unSub?.();
    };
  }, [toUser, user]);

  const onClickHandler = () => {
    isRequesting(relation)
      ? cancelRequest(toUser?.id)
      : followUser(toUser.id, user.uid);
  };
  const isFollower = (a = true, b = false) =>
    relation?.followers?.find((x) => x == user?.uid) ? a : b;
  const isHasFollowed = () => isFollowings(relation, toUser.id);
  return (
    <div>
      {isRequesting(relation)}
      {isRequesting(relation) ? (
        <Icon
          className="bg-slate-100 dark:bg-slate-700"
          onClick={() => cancelRequest(toUser?.id)}
        >
          more
        </Icon>
      ) : (
        <Icon
          onClick={() => followUser(toUser.id, user.uid)}
          className={
            "dark:text-slate-200 " +
            isFollower(
              " bg-sec-light text-purple-400 dark:bg-slate-700 dark:text-slate-500 ",
              " bg-primary-light text-white dark:bg-primary-dark"
            )
            // (isHasFollowed()
            //   ? " text-primary-light ring-1 bg-white "
            //   : " text-white bg-primary-light dark:bg-primary-dark ")
          }
        >
          {isFollower("check", "add")}
        </Icon>
      )}
    </div>
  );
};

export default FollowerBtn;
