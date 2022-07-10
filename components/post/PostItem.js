import Box from "../elements/Box";
import UserItem from "../user/UserItem";
import usePost from "../../controls/usePost";
import ImgViewer from "../elements/ImgViewer";
import CommentMain from "../comment/CommentMain";
import LikeMain from "../reactions/LikeMain";
import Option from "../elements/Option";
import PostEditorMain from "../postEditor/PostEditorMain";
import { useState } from "react";
import useUser from "../../controls/useUser";
import EditHist from "../elements/EditHist";

export default function PostItem({ data }) {
  const { user } = useUser();
  const { removePost, updatePost, set } = usePost();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);

  const options = [
    {
      text: "Delete Post",
      action: () => removePost(data?.id, data?.images),
      secure: true,
      icon: "delete-bin-5",
    },
    {
      text: "Edit Post",
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

  function bodyStyle() {
    return (
      (data?.images?.length == 0 || !data?.images) && data?.body?.length < 200
    );
  }

  return (
    <Box
      onMouseLeave={(_) => setActive(false)}
      onMouseEnter={(_) => setActive(true)}
      className="flex flex-col text-gray-500 min-h-[300px] my-5 mx-0 px-0 py-0 shadow-sm ring-[1px] ring-slate-200"
    >
      <div className="flex justify-between items-start p-2 ">
        <UserItem
          userId={data?.userId}
          className="py-0 px-0 dark:text-slate-300"
        >
          <small className="text-gray-400 text-xs block">
            {new Date(data?.timestamp?.seconds)?.toDateString()}
          </small>
        </UserItem>
        {active && (
          <Option options={options} authId={user?.uid} userId={data?.userId} />
        )}
      </div>
      <div
        style={{
          background: bodyStyle() && `url('img/body1.jpg')`,
        }}
        className={
          "flex-1 px-2 " +
          (bodyStyle() &&
            " min-h-[220px] py-12 px-5 text-white text-xl font-semibold text-center items-center content-center flex flex-col justify-center bg-center bg-cover bg-no-repeat ")
        }
      >
        <p className={bodyStyle() && " max-w-sm"}>{data?.body}</p>
      </div>

      {viewEdit && (
        <EditHist
          className="text-sm px-2"
          prev={data?.prev}
          date={data?.updatedAt}
        />
      )}
      <PostEditorMain
        data={data}
        onUpdate={updatePost}
        open={open}
        setOpen={setOpen}
      />
      <ImgViewer imgs={data?.images} />

      <LikeMain
        col_="posts"
        likes={data?.likes}
        loves={data?.loves}
        userId={data?.userId}
        docId={data?.id}
        docUserId={data?.userId}
        className="pt-2"
        likeActiveStyle=" text-white bg-indigo-300 p-1 text-white dark:text-white"
        loveActiveStyle="text-white bg-pink-300 p-1 pt-2 dark:text-white "
        likeClass="hover:animation-bounce"
        loveClass="hover:animation-bounce"
      />
      <CommentMain
        postId={data?.id}
        postUserId={data?.userId}
        hookComments={(hookComments) => set({ hookComments })}
      />
    </Box>
  );
}
