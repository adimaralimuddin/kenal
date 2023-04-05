import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import UseMessages from "../../controls/chats/useMessages";
import UserItem from "../user/UserItem";

const NotifItemGroupChatRequest = ({ data }) => {
  console.log("notif item", data);
  const router = useRouter();
  const { set } = UseMessages();
  const query = {
    ...router.query,
    tab: "messages",
    messageTab: "request",
    converseId: data.docId,
  };
  const onClickHandler = () => {
    set({ selectedConverse: data.docId });
  };
  return (
    <Link href={{ query }} onClick={onClickHandler}>
      <div>
        hhhhhhhhhhhhhhhhhhhhhhhh
        <header>
          <UserItem userId={data.from} />
          <small>{data.message}</small>
        </header>
        {/* <small>{JSON.stringify(data)}</small> */}
      </div>
    </Link>
  );
};

export default NotifItemGroupChatRequest;
