import { useState } from "react";
import useUser from "../../controls/useUser";
import EditHist from "../elements/EditHist";
import Icon from "../elements/Icon";
import ImgViewer from "../elements/ImgViewer";
import Option from "../elements/Option";
import PostBody from "../elements/PostBody";
import PostEditorMain from "../postEditor/PostEditorMain";
import LikeMain from "../reactions/LikeMain";
import UserItem from "../user/UserItem";

export default function ReplyItem({ data, onDelete, onUpdate, openReply }) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  const [profile, setProfile] = useState();

  const options = [
    {
      text: "Delete Reply",
      action: () => onDelete(data?.id),
      secure: true,
      icon: "delete-bin-5",
    },
    {
      text: "Edit Reply",
      action: () => setOpen(true),
      secure: true,
      icon: "edit-2",
    },
  ];

  if (data?.updatedAt) {
    options.push({
      text: viewEdit ? "hide edit" : "view edit",
      action: () => setViewEdit((p) => !p),
    });
  }

  return (
    <div
      onMouseEnter={(_) => setActive(true)}
      onMouseLeave={(_) => setActive(false)}
    >
      <div className="flex items-start">
        <UserItem
          size={26}
          userId={data?.userId}
          className=" py-0 my-0"
          small="on"
          noName="on"
          passer={setProfile}
        />

        <div className="pt-2 ">
          <PostBody
            body={data?.body}
            replyTo={data?.replyTo}
            header={
              <UserItem
                userId={data?.userId}
                noImg="on"
                className="ring-1d py-0 "
              />
            }
            className="bg-slate-100 dark:bg-slate-600 "
          >
            {viewEdit && <EditHist prev={data?.prev} date={data?.updatedAt} />}
          </PostBody>

          <PostEditorMain
            onUpdate={onUpdate}
            data={data}
            open={open}
            setOpen={setOpen}
          />
          <div className="flex items-center">
            <LikeMain
              size="x1"
              col_="replies"
              docUserId={data?.userId}
              docId={data?.id}
              likes={data?.likes}
              loves={data?.loves}
              likeActiveStyle="text-blue-400"
              loveActiveStyle="text-pink-400"
            />
            {active && (
              <button
                className="flex items-center px-0 py-0"
                onClick={(_) => openReply([data?.userId, profile?.userName])}
              >
                <Icon size="1x">send-plane</Icon>
              </button>
            )}
          </div>
        </div>
        {active && (
          <Option
            className="pt-2 mx-2"
            options={options}
            authId={user?.uid}
            userId={data?.userId}
          />
        )}
      </div>
      <ImgViewer imgs={data?.images} className="min-h-[170px] max-w-[210px] " />
    </div>
  );
}
