import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import useRelations from "../../../controls/useRelations";
import useUser from "../../../controls/useUser";
import NotifItemDiv from "../NotifItemDiv";

const NotifRelations = ({ notif }) => {
  const router = useRouter();
  const { acceptFollowRequest, declineFollowRequest } = useRelations();
  const { type, subtype } = notif;
  const { user } = useUser();
  const msg = () => {
    switch (subtype) {
      case "sendrequest":
        return `want's to follow you ${msgType()}.`;
      default:
        return `type: ${type} subtype: ${subtype} your post`;
    }
  };

  const msgType = () => {
    return "";
  };

  const icon = () => {
    return "user";
  };

  const tabType = () => {
    return "profile";
  };

  const onAccepthandler = () => {
    acceptFollowRequest(user.uid, notif.from);
  };

  const onDeclinedHandler = () => {
    declineFollowRequest(user.uid, notif.from);
  };

  return (
    // <Link
    //   href={{
    //     query: {
    //       ...router.query,
    //       tab: tabType(),
    //       userId: notif?.docId,
    //     },
    //   }}
    // >
    <div>
      {/* {notif?.actionId} */}
      <NotifItemDiv
        msg={msg()}
        onyes={onAccepthandler}
        onNo={onDeclinedHandler}
        confirmButtons={true}
        notif={notif}
        icon={icon()}
      />
    </div>
    // </Link>
  );
};

export default NotifRelations;
