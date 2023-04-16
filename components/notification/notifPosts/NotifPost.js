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
        return `like your ${msgType()}.`;
      case "unlike":
        return `dislike your ${msgType()}.`;
      case "love":
        return `love your ${msgType()}.`;
      case "unlove":
        return `don't love your ${msgType()}.`;
      case "comment":
        return `comment on your ${msgType()}.`;
      case "reply":
        return `reply on your ${msgType()}.`;
      default:
        return `type: ${type} subtype: ${subtype} your post`;
    }
  };

  const msgType = () => {
    switch (type) {
      case "storyComments":
        return "comment on a story.";
      default:
        return type;
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

  const tabType = () => {
    switch (type) {
      case "story":
        return "storyitem";
      case "storyComments":
        return "storyitem";
      default:
        return "postitem";
    }
  };

  return (
    <Link
      href={{
        query: {
          ...router.query,
          tab: tabType(),
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
