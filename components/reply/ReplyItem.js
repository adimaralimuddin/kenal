import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useReply from "../../controls/useReply";
import useUser from "../../controls/useUser";
import ToolDateToDisplay from "../../controls/utils/toolDateToDisplay";
import EditHist from "../elements/EditHist";
import Icon from "../elements/Icon";
import ImgViewer from "../elements/ImgViewer";
import Option from "../elements/Option";
import PostBody from "../elements/PostBody";
import Verifier from "../elements/Verifier";
import PostEditorMain from "../postEditor/PostEditorMain";
import LikeMain from "../reactions/LikeMain";
import UserItem from "../user/UserItem";

export default function ReplyItem({
  data,
  onDelete,
  onUpdate,
  openReply,
  par,
}) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  const [profile, setProfile] = useState();
  const [deleting, setDeleting] = useState(false);
  const [replies, setReplies] = par;
  const { checkReplyPrivacy } = useReply();

  const onDeleteHandler = () => onDelete(data?.id);

  const router = useRouter();

  useEffect(() => {
    checkPrivacy();
  }, [data]);
  async function checkPrivacy() {
    const privacy = await checkReplyPrivacy(data);
    // if (!privacy) {
    //   setReplies((reps) => {
    //     return reps?.filter((r) => r?.id !== data?.id);
    //   });
    // }
  }

  const options = [
    {
      text: "Edit Reply",
      action: () => setOpen(true),
      secure: true,
      icon: "edit-2",
    },
    {
      text: "Delete Reply",
      action: () => setDeleting(true),
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
      // className={"py-1 " + (router.query?.actionId === data?.id && " ")}
    >
      <Verifier
        text="are you sure to delete this reply?"
        open={deleting}
        set={setDeleting}
        onYes={onDeleteHandler}
      />
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
            className="bg-slate-100 dbg-white ring- ring-slate-200 shadow-lgd dark:bg-slate-700 dark:text-slate-400 shadow-slate-200"
          >
            {viewEdit && <EditHist prev={data?.prev} date={data?.updatedAt} />}
          </PostBody>

          <PostEditorMain
            onUpdate={onUpdate}
            data={data}
            open={open}
            setOpen={setOpen}
          />
          <div className="flex items-center pt-2 gap-2 text-slate-500">
            <small className="text-[.7rem]">
              {ToolDateToDisplay(data?.timestamp?.toDate())}
            </small>
            <LikeMain
              col_="replies"
              postId={data.postId}
              data={data}
              noIcon={true}
              size="x1"
              likeActiveStyle="text-indigo-300 dark:text-indigo-400"
              loveActiveStyle="text-pink-300 dark:text-pink-400"
            />
            <button
              className="flex items-center px-0 py-0"
              onClick={(_) => {
                openReply([data?.userId, profile?.displayName]);
              }}
            >
              <small className="hover:underline dark:text-slate-400 font-medium">
                reply
              </small>
            </button>
          </div>
        </div>
        {active && user?.uid == data?.userId && (
          <Option
            className="pt-2 mx-2"
            options={options}
            authId={user?.uid}
            userId={data?.userId}
          />
        )}
      </div>

      <ImgViewer
        imgs={data?.images || []}
        className="min-h-[230px] max-h-[230px]  max-w-[300px] "
      />
    </div>
  );
}
