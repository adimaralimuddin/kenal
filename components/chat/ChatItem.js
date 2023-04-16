import { useEffect, useState } from "react";
import useChatMutator from "../../controls/chats/useChatMutator";
import useUser from "../../controls/useUser";
import ToolDateToDisplay from "../../controls/utils/toolDateToDisplay";
import Icon from "../elements/Icon";
import ImgViewer from "../elements/ImgViewer";
import PostBody from "../elements/PostBody";
import LikeMain from "../reactions/LikeMain";
import UserItem from "../user/UserItem";

export default function ChatItem({ data }) {
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const { seenChat } = useChatMutator();

  const mine = (a = true, b = false) => (data?.userId == user?.uid ? a : b);

  const isSeen = (a = true, b = false) => (data.seen ? a : b);
  const displayDate = () => ToolDateToDisplay(data.timestamp?.toDate());

  useEffect(() => {
    seenChat(data);
  }, [data]);

  return (
    <div
      onMouseEnter={(_) => setActive(true)}
      onMouseLeave={(_) => setActive(false)}
      className={"flex  flex-col ring-1d "}
    >
      <div className={"flex gap-1  " + mine("", " flex-row-reverse")}>
        {!data?.isContinue && (
          <UserItem
            userId={data?.userId}
            noName={true}
            small={true}
            size={20}
          ></UserItem>
        )}
        {data?.isContinue && <div className="min-w-[40px]"></div>}
        {data?.body && (
          <PostBody
            body={data?.body}
            className={
              "mt-1  shadow-lg shadow-indigo-200 dark:shadow-slate-800 " +
              mine(
                " bg-blue-400 text-white  -50 ring-blue-200 rounded-tl-xl dark:bg-blue-900 dark:text-slate-300",
                "text-slate-500 rounded-tr-xl bg-slate-50d bg-white ring-gray-200 dark:bg-slate-700 dark:text-slate-300  "
              )
            }
          ></PostBody>
        )}
      </div>
      <ImgViewer
        imgs={data?.images}
        className="bg-white p-2 rounded-xl shadow-lg shadow-slate-300 dark:shadow-black mt-2"
      />
      {data?.last && (
        <div
          className={
            " flex flex-cold items-center min-h-[35px] " +
            mine("", " justify-start flex-row-reverse ")
          }
        >
          <small className="text-slate-400 text-[.7rem] px-2 flex gap-1">
            {data?.seen && (
              <span className="flex ring-1d text-indigo-300 dark:text-blue-400">
                seen
                <Icon
                  className=" text-indigo-300 dark:text-indigo-400"
                  size={20}
                >
                  check
                </Icon>
              </span>
            )}
            <span>{displayDate()}</span>
          </small>

          {active && (
            <LikeMain
              docId={data?.id}
              data={data}
              postId={data?.id}
              col_="messages"
              small="on"
              className="pt-1 "
              noNotif={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
