import { useEffect, useState } from "react";
import useStory from "../../controls/useStory";
import useUser from "../../controls/useUser";
import ImgViewer from "../elements/ImgViewer";
import Option from "../elements/Option";
import PostEditorMain from "../postEditor/PostEditorMain";
import LikeMain from "../reactions/LikeMain";
import UserItem from "../user/UserItem";

export default function StoryCommentItem({ data, par }) {
  const { storyCommentDelete, storyCommentUpdate, checkStoryCommentPrivacy } =
    useStory();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const [_, setComments] = par;
  // console.log("story comment item: ", data);
  useEffect(() => {
    checkPrivacy();
  }, [data]);
  async function checkPrivacy() {
    const privacy = await checkStoryCommentPrivacy(data);
    if (!privacy) {
      setComments((p) => {
        return p?.filter((c) => c?.id !== data?.id);
      });
    }
  }

  const options = [
    {
      text: "Update Comment",
      action: () => setOpen(true),
      icon: "delete-bin-5",
      secure: true,
    },
    {
      text: "Delete Comment",
      action: () => storyCommentDelete(data?.id),
      icon: "delete-bin-5",
      secure: true,
    },
  ];

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="flex flex-col"
    >
      <div className="flex items-center justify-start gap-3 ">
        <UserItem
          small="on"
          userId={data?.userId}
          className="pt-0 pb-0 text-gray-200"
        />
        {active && user?.uid == data?.userId && (
          <Option userId={data?.userId} options={options} par="pt-5" />
        )}
      </div>
      <div className="bg-slate-100 dark:bg-d2 text-sm ml-10 ring-1 ring-slate-200 dark:ring-0 p-2 rounded-lg self-start text-gray-500 dark:text-gray-300">
        <p>{data?.body}</p>
      </div>
      <ImgViewer
        imgs={data?.images}
        className="max-h-[250px]d min-h-[200px] p-2"
      />
      <PostEditorMain
        data={data}
        open={open}
        setOpen={setOpen}
        onUpdate={storyCommentUpdate}
      />
      <span className="ml-10 py-1">
        <LikeMain
          postId={data.storyId}
          col_="storyComments"
          data={data}
          size="small"
          
        />
      </span>
    </div>
  );
}
