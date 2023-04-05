import { useState } from "react";
import useChat from "../../controls/useChat";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";
import ImgViewer from "../elements/ImgViewer";
import PostBody from "../elements/PostBody";
import LikeMain from "../reactions/LikeMain";
import UserItem from "../user/UserItem";

export default function ChatItem({ data }) {
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const chat = useChat();

  // console.log("chat", data);

  const mine = (a = true, b = false) =>
    data?.userId?.[0] == user?.uid ? a : b;

  const isSeen = (a = true, b = false) => (data.seen ? a : b);

  const getDate = (date, msg = "ago") => {
    if (!date) return "";
    const now = new Date();
    const yearDif = now.getFullYear() - date.getFullYear();
    const monthDif = now.getMonth() - date.getMonth();
    const dayDif = Math.abs(now.getDay() - date.getDay());
    const hourDif = Math.abs(now.getHours() - date.getHours());
    const minDif = Math.abs(now.getMinutes() - date.getMinutes());
    const secDif = Math.abs(now.getSeconds() - date.getSeconds());
    console.log({ hourDif, minDif: minDif, secDif });

    if (yearDif > 0) {
      return yearDif + ` year${yearDif !== 1 ? "s" : ""} ` + msg;
    }
    if (monthDif > 0) {
      return monthDif + ` month${monthDif !== 1 ? "s" : ""} ` + msg;
    }
    if (dayDif > 0) {
      return dayDif + ` day${dayDif !== 1 ? "s" : ""} ` + msg;
    }
    if (hourDif > 0) {
      return hourDif + ` hour${hourDif !== 1 ? "s" : ""} ` + msg;
    }
    if (minDif > 0) {
      return minDif + ` minute${minDif !== 1 ? "s" : ""} ` + msg;
    }
    return secDif + ` second${secDif !== 1 ? "s" : ""} ` + msg;
  };

  return (
    <div
      onMouseEnter={(_) => setActive(true)}
      onMouseLeave={(_) => setActive(false)}
      className={"flex  flex-col "}
    >
      <div className={"flex  " + mine("", " flex-row-reverse")}>
        {!data?.isContinue && (
          <UserItem
            userId={data?.userId?.[0]}
            noName={true}
            small={true}
            size={20}
          ></UserItem>
        )}
        {data?.isContinue && <div className="min-w-[40px]"></div>}
        {/* <Avatar/> */}
        {data?.body && (
          <PostBody
            // par={mine("items-start", " items-end")}
            body={data?.body}
            // data={data}
            className={
              "mt-1 bg-slate-50d dark:bg-slate-600d  ring-1d shadow-lg shadow-indigo-200 dark:shadow-slate-800 text-whited " +
              mine(
                " bg-blue-400 text-white  -50 ring-blue-200 rounded-tl-xl dark:bg-blue-900 dark:text-slate-300",
                "text-slate-500 rounded-tr-xl bg-slate-50d bg-white ring-gray-200 dark:bg-slate-700 dark:text-slate-300  "
              )
            }
          ></PostBody>
        )}
      </div>
      {/* last: {data?.last?.toString()} */}
      {/* isContinue: {data?.isContinue?.toString()} */}
      <ImgViewer
        imgs={data?.images}
        className="bg-white p-2 rounded-xl shadow-lg shadow-slate-300 dark:shadow-black mt-2"
      />
      {data?.last && (
        <div
          className={
            " flex flex-col min-h-[50px] ring-1 ring-transparent " +
            mine("", " items-end ")
          }
        >
          <small className="text-slate-400 text-[.7rem] px-2">
            seen {data?.createdAt && getDate(data.createdAt?.toDate())}
          </small>
          {active && (
            <LikeMain data={data} col_="messages" small="on" className="pt-1" />
          )}
        </div>
      )}
    </div>
  );
}
