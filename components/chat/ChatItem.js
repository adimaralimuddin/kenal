import { useEffect, useState } from "react";
import useUser from "../../controls/useUser";
import EditHist from "../elements/EditHist";
import ImgViewer from "../elements/ImgViewer";
import Option from "../elements/Option";
import PostBody from "../elements/PostBody";
import PostEditorMain from "../postEditor/PostEditorMain";
import LikeMain from "../reactions/LikeMain";
import UserItem from "../user/UserItem";

export default function ChatItem({ data, onDelete, onUpdate }) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  const [mine, setMine] = useState(data?.conver[0] == user?.uid ? true : false);

  useEffect(() => {
    setMine(data?.conver[0] == user?.uid ? true : false);
  }, [user]);

  const options = [
    //   { text: "delete", action: () => onDelete(data?.id), secure: true },
    //   { text: "edit", action: () => setOpen(true), secure: true },
  ];

  //   if (data?.updatedAt) {
  //     options.push({
  //       text: viewEdit ? "hide edit" : "view edit",
  //       action: () => setViewEdit((p) => !p),
  //     });
  //   }

  return (
    <div
      onMouseEnter={(_) => setActive(true)}
      onMouseLeave={(_) => setActive(false)}
      className=""
    >
      {/* <div className="flex items-center justify-between ">
        {active && (
        <Option options={options} authId={user?.uid} userId={data?.userId} />
        )}
      </div> */}
      {/* <div className="ring-1 flex flex-col items-end"> */}
      <PostBody
        par={mine ? "items-start" : " items-end"}
        body={data?.body}
        className=" bg-gray-50 ring-1 ring-gray-200"
      >
        {viewEdit && <EditHist prev={data?.prev} date={data?.updatedAt} />}
      </PostBody>
      <ImgViewer imgs={data?.images} className="min-h-[250px]" />
      <PostEditorMain
        //   onUpdate={onUpdate}
        data={data}
        open={open}
        setOpen={setOpen}
      />
      <div
        className={
          " flex flex-col min-h-[30px] ring-1 ring-transparent " +
          (!mine && " items-end ")
        }
      >
        {active && (
          <LikeMain
            docId={data?.id}
            col_="chats"
            likes={data?.likes}
            loves={data?.loves}
            small="on"
            className="pt-1"
          />
        )}
      </div>
      {/* </div> */}
    </div>
  );
}
