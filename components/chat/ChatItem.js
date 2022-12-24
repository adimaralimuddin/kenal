import { useState } from "react";
import useUser from "../../controls/useUser";
import ImgViewer from "../elements/ImgViewer";
import PostBody from "../elements/PostBody";
import LikeMain from "../reactions/LikeMain";

export default function ChatItem({ data }) {
  const { user } = useUser();
  const [active, setActive] = useState(false);

  const mine = (a = true, b = false) =>
    data?.conver?.[0] == user?.uid ? a : b;

  return (
    <div
      onMouseEnter={(_) => setActive(true)}
      onMouseLeave={(_) => setActive(false)}
      className=""
    >
      {data?.body && (
        <PostBody
          par={mine("items-start", " items-end")}
          body={data?.body}
          className={
            " bg-slate-50d dark:bg-slate-600d ring-1 ring-gray-100 " +
            mine(
              "bg-slate-100 dark:bg-slate-600 ",
              " bg-indigo-100 dark:bg-indigo-600"
            )
          }
        ></PostBody>
      )}
      <ImgViewer imgs={data?.images} className="min-h-[250px] mt-2" />

      <div
        className={
          " flex flex-col min-h-[30px] ring-1 ring-transparent " +
          mine("", " items-end ")
        }
      >
        {active && (
          <LikeMain data={data} col_="chats" small="on" className="pt-1" />
        )}
      </div>
    </div>
  );
}
