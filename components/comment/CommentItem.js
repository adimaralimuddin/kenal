import { useEffect, useState } from "react";
import useComment from "../../controls/useComment";
import useReply from "../../controls/useReply";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import ToolDateToDisplay from "../../controls/utils/toolDateToDisplay";
import { useAlert } from "../elements/Alert";
import EditHist from "../elements/EditHist";
import Icon from "../elements/Icon";
import ImgViewer from "../elements/ImgViewer";
import Option from "../elements/Option";
import PostBody from "../elements/PostBody";
import Verifier from "../elements/Verifier";
import Writer from "../elements/Writer";
import Comp from "../main/Comp";
import PostEditorMain from "../postEditor/PostEditorMain";
import LikeMain from "../reactions/LikeMain";
import ReplyMain from "../reply/ReplyMain";
import UserItem from "../user/UserItem";

function CommentItem({ data, onDelete, onUpdate, state, par }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  const { user } = useUser();
  const [openComment, setOpenComment] = useState(false);
  const { addReply } = useReply(data.id, data?.postId);
  const [replyTo, setReplyTo] = useState();
  const [deleting, setDeleting] = useState(false);
  const { pop, open: openAlert } = useAlert();

  const { listenUserSettings } = useSettings();
  const { checkCommentItemPrivacy } = useComment();
  const [privacy, setPrivacy] = useState();
  const [comments, setComments] = par;

  useEffect(() => {
    const retSettings = listenUserSettings(
      data?.userId,
      state?.key?.("postUserSettings")
    );
    return retSettings;
  }, [data?.userId]);

  useEffect(() => {
    checkPrivacy();
  }, [data]);
  async function checkPrivacy() {
    const privacy_ = await checkCommentItemPrivacy(data);
    setPrivacy(privacy_);
    if (!privacy_) {
      setComments((c) => {
        return c?.filter((c) => c?.id !== data?.id);
      });
    }
  }

  if (!privacy) return null;

  const onDeleteComment = () => {
    openAlert("Deleting comment . . . ", true);
    onDelete(data?.id, data?.images, () => {
      pop("Comment deleted!", "check");
    });
  };

  const options = [
    {
      text: "Edit Comment",
      action: () => setOpen(true),
      secure: true,
      icon: "edit-2",
    },
    {
      text: "Delete Comment",
      action: () => setDeleting(true),
      promt: true,
      secure: true,
      icon: "delete-bin-5",
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
      id={data?.id}
      onMouseEnter={(_) => setActive(true)}
      onMouseLeave={(_) => setActive(false)}
      className=" "
    >
      <Verifier
        text="Are you sure to delete this comment?"
        open={deleting}
        set={setDeleting}
        onYes={onDeleteComment}
      />
      <div className="flex gap-1 flex-wrap items-start  ">
        <UserItem
          userId={data?.userId}
          postUserSettings={state?.postUserSettings}
          noName="on"
          small="on"
          className="px-0 py-0"
        />
        <div className="flex items-start ">
          <div className="pt-4d px-1 w-full ">
            <PostBody
              className=" ring-1d self-start p-0 px-0 rounded-lg bg-slate-100  ring-slate-200 dark:bg-slate-700   dark:text-slate-400 shadow-lgd shadow-slate-200 "
              header={
                <UserItem
                  userId={data?.userId}
                  noImg="on"
                  className=" my-0 py-0 "
                />
              }
              body={data?.body}
            >
              {viewEdit && (
                <EditHist prev={data?.prev} date={data?.updatedAt} />
              )}
            </PostBody>

            <PostEditorMain
              data={data}
              open={open}
              onUpdate={onUpdate}
              setOpen={setOpen}
            />
            <ImgViewer className=" max-w-[450px] my-2" imgs={data?.images} />
            <div className=" text-[.98rem] flex gap-2 items-center pt-1 font-medium text-slate-500">
              <small className="text-[.7rem]">
                {ToolDateToDisplay(data?.timestamp?.toDate())}
              </small>
              <LikeMain
                col_="comments"
                postId={data?.postId}
                size={"1x"}
                data={data}
                noIcon={true}
                likeActiveStyle="text-indigo-300 dark:text-indigo-400"
                loveActiveStyle="text-pink-300 dark:text-pink-400"
              />
              <button
                className="flex items-center px-0 py-0"
                onClick={(_) => setOpenComment((p) => !p)}
              >
                <small className="hover:underline dark:text-slate-400 font-medium">
                  reply
                </small>
              </button>
            </div>
            <ReplyMain
              postId={data?.postId}
              commentId={data?.id}
              openReply={(replier) => {
                if (replier?.[0] == user?.uid) {
                  setReplyTo(null);
                } else {
                  setReplyTo(replier);
                }
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
                        postUserId: data?.postUserId,
                        commentUserId: data?.userId,
                        commentId: data?.id,
                        postId: data?.postId,
                      },
                      clear
                    )
                  }
                  onPostCaller={(_) => setOpenComment(false)}
                  text="reply"
                  div="ring-2d border-b-2 dark:border-slate-600 pb-3"
                />
              </div>
            )}
          </div>
          {user?.uid == data?.userId && (
            <Option
              options={options}
              authId={user?.uid}
              userId={data?.userId}
              onlyUser={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
// export default Comp(CommentItem);
