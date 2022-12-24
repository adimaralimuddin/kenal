import { useEffect, useState } from "react";
import useComment from "../../controls/useComment";
import useReply from "../../controls/useReply";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
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
      onMouseEnter={(_) => setActive(true)}
      onMouseLeave={(_) => setActive(false)}
      className="ring-1d p-0 m-0"
    >
      <Verifier
        text="Are you sure to delete this comment?"
        open={deleting}
        set={setDeleting}
        onYes={onDeleteComment}
      />
      <div className="py-3">
        <div className=" -mb-5">
          <UserItem
            userId={data?.userId}
            postUserSettings={state?.postUserSettings}
            noName="on"
            small="on"
            className="px-0 py-0"
          />
        </div>
        <div className="pt-2 px-1 w-full pl-4">
          <div className="flex">
            <PostBody
              header={
                <UserItem
                  userId={data?.userId}
                  noImg="on"
                  className="ring-1d my-0 py-0 "
                />
              }
              className=" bg-slate-200 dark:bg-d1 dark:text-slate-400"
              body={data?.body}
            >
              {viewEdit && (
                <EditHist prev={data?.prev} date={data?.updatedAt} />
              )}
            </PostBody>
            {active && user?.uid == data?.userId && (
              <Option
                className="pt-2 mx-2"
                options={options}
                authId={user?.uid}
                userId={data?.userId}
                onlyUser={true}
              />
            )}
          </div>
          <PostEditorMain
            data={data}
            open={open}
            onUpdate={onUpdate}
            setOpen={setOpen}
          />
          <ImgViewer className=" max-w-[450px] my-2" imgs={data?.images} />
          <div className=" flex items-center pt-[1px]">
            <LikeMain
              size="1x"
              data={data}
              col_="comments"
              likeActiveStyle="text-indigo-300 dark:text-indigo-400"
              loveActiveStyle="text-pink-300 dark:text-pink-400"
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
                div="ring-1 rounded-md bg-gray-100 dark:bg-slate-600 dark:ring-0 ring-gray-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
// export default Comp(CommentItem);
