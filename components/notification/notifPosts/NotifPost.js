import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NotifItemDiv from "../NotifItemDiv";

const NotifPost = ({ notif }) => {
  const router = useRouter();
  const { type, subtype } = notif;
  const msg = () => {
    switch (subtype) {
      case "like":
        return `like your ${type}.`;
      case "unlike":
        return `dislike your ${type}.`;
      case "love":
        return `love your ${type}.`;
      case "unlove":
        return `don't love your ${type}.`;
      case "comment":
        return `comment on your ${type}.`;
      case "reply":
        return `reply on your ${type}.`;
      default:
        return `type: ${type} subtype: ${subtype} your post`;
    }
  };

  const icon = () => {
    switch (notif.subtype) {
      case "like":
        return "thumb-up";
      case "unlike":
        return "thumb-down";
      case "love":
        return "heart";
      case "comment":
        return "chat-3";
      case "reply":
        return "chat-3";
    }
  };

  return (
    <Link
      href={{
        query: {
          ...router.query,
          tab: "explore",
          exploreTab: "posts",
          exploreSubTab: "post",
          postId: notif?.docId,
          actionId: notif?.actionId,
        },
      }}
    >
      <div>
        {/* {notif?.actionId} */}
        <NotifItemDiv msg={msg()} notif={notif} icon={icon()} />
      </div>
    </Link>
  );
};

export default NotifPost;
