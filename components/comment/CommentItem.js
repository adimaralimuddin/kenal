import { useEffect, useState } from "react";
import useReply from "../../controls/useReply";
import useUser from "../../controls/useUser";
import EditHist from "../elements/EditHist";
import Icon from "../elements/Icon";
import ImgViewer from "../elements/ImgViewer";
import Option from "../elements/Option";
import PostBody from "../elements/PostBody";
import Writer from "../elements/Writer";
import PostEditorMain from "../postEditor/PostEditorMain";
import LikeMain from "../reactions/LikeMain";
import ReplyMain from "../reply/ReplyMain";
import UserItem from "../user/UserItem";

export default function CommentItem({ data, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  const { user } = useUser();
  const [poster, setPoster] = useState();
  const [openComment, setOpenComment] = useState(false);
  const { addReply } = useReply(data.id, data?.postId);
  const [replyTo, setReplyTo] = useState();

  const options = [
    {
      text: "Delete Comment",
      action: () => onDelete(data?.id, data?.images),
      promt: true,
      secure: true,
      icon: "delete-bin-5",
    },
    {
      text: "Edit Comment",
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
      className="ring-1d p-0 m-0"
    >
      <div className="flex items-start">
        <UserItem
          userId={data?.userId}
          noName="on"
          small="on"
          className="px-0 py-0"
          passer={setPoster}
        />
        <div className="pt-2 px-1 w-full">
          <div className="flex">
            <PostBody
              header={
                <UserItem
                  userId={data?.userId}
                  noImg="on"
                  className="ring-1d my-0 py-0 "
                />
              }
              className=" bg-slate-200 dark:bg-slate-600"
              body={data?.body}
            >
              {viewEdit && (
                <EditHist prev={data?.prev} date={data?.updatedAt} />
              )}
            </PostBody>
            {active && (
              <Option
                className="pt-2 mx-2"
                options={options}
                authId={user?.uid}
                userId={data?.userId}
              />
            )}
          </div>
          <PostEditorMain
            data={data}
            open={open}
            onUpdate={onUpdate}
            setOpen={setOpen}
          />
          <ImgViewer
            className="min-h-[190px] max-w-[250px]"
            imgs={data?.images}
          />
          <div className=" flex items-center pt-[1px]">
            <LikeMain
              size="1x"
              // userId={data?.userId}
              docUserId={data?.userId}
              docId={data?.id}
              col_="comments"
              likes={data?.likes}
              loves={data?.loves}
              // likeActiveStyle=" text-blue-300"
              // loveActiveStyle=" text-pink-400"
            />
            {active && (
              <button
                className="flex items-center px-0 py-0"
                onClick={(_) => setOpenComment((p) => !p)}
              >
                <Icon size="1x">send-plane</Icon>
              </button>
            )}
          </div>
          <ReplyMain
            postId={data?.postId}
            commentId={data?.id}
            openReply={(replier) => {
              setReplyTo(replier);
              setOpenComment(false);
              setTimeout(() => {
                setOpenComment(true);
              }, 200);
            }}
          />
          {openComment && (
            <div className="py-2">
              <Writer
                user={user}
                replyTo={replyTo}
                onPost={(data_, clear) =>
                  addReply(
                    {
                      ...data_,
                      commentUserId: data?.userId,
                      commentId: data?.id,
                      postId: data?.postId,
                    },
                    clear
                  )
                }
                onPostCaller={(_) => setOpenComment(false)}
                text="reply"
                div="ring-1 rounded-md bg-gray-100 dark:bg-slate-600 dark:ring-0 ring-gray-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
