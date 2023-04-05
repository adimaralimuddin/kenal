import React, { useEffect, useState } from "react";
import useRelations from "../../controls/useRelations";
import useUser from "../../controls/useUser";
import Icon from "../elements/Icon";

const FollowerBtn = ({ toUser }) => {
  const { user } = useUser();
  const { listen: listenRelations, followUser, isFollowings } = useRelations();
  const [relation, setRelation] = useState(null);

  useEffect(() => {
    if (!user?.uid || !toUser || !listenRelations) return;

    const unSub = listenRelations(user.uid, (relationSnap) => {
      setRelation(relationSnap);
    });
    return () => {
      unSub?.();
    };
  }, [toUser, user]);

  const onFollowHandler = () => {
    followUser(toUser.id, user.uid);
  };

  const isHasFollowed = () => isFollowings(relation, toUser.id);
  return (
    <div
      onClick={onFollowHandler}
      className={
        " flex-center rounded-full circle text-white " +
        (isHasFollowed() ? "bg-sec" : "bg-prime")
      }
    >
      <Icon
        className={
          "" + (isHasFollowed() ? " text-primary-light " : " text-white ")
        }
      >
        {isHasFollowed() ? "check" : "add"}
      </Icon>
    </div>
  );
};

export default FollowerBtn;
