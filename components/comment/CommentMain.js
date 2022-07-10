import { useEffect, useState } from "react";
import useComment from "../../controls/useComment";
import useUser from "../../controls/useUser";
import Writer from "../elements/Writer";
import CommentItem from "./CommentItem";

export default function CommentMain({ postId, postUserId, hookComments }) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const { addComment, comments, removeComment, updateComment } = useComment(
    postId,
    hookComments
  );

  useEffect(() => {
    comments?.length <= 2 && setOpen(true);
  }, [comments]);

  return (
    <div className="ring-1d p-2">
      <p
        onClick={(_) => setOpen((p) => !p)}
        className=" cursor-pointer text-end px-2 mb-3 text-sm float-right text-gray-400 -mt-8 "
      >
        {open
          ? comments?.length + " comments"
          : comments?.length <= 2
          ? comments?.length + " comments"
          : comments?.length - 2 + " more comments"}
      </p>
      {open && (
        <Writer
          autoFocus={false}
          onPost={(data, clear) =>
            addComment({ ...data, postId, postUserId }, clear)
          }
          text="comment"
          user={user}
        />
      )}
      {/* {open && <hr className="w-full" />} */}
      {open && (
        <div className=" w-full">
          {comments?.map((comment) => (
            <CommentItem
              onDelete={removeComment}
              onUpdate={updateComment}
              data={comment}
              key={comment?.id}
            />
          ))}
        </div>
      )}
      {!open && comments?.length > 2 && (
        <div className=" w-full pt-2">
          {comments
            ?.filter((x, i) => i <= 1)
            ?.map((comment) => (
              <CommentItem
                onDelete={removeComment}
                onUpdate={updateComment}
                data={comment}
                key={comment?.id}
              />
            ))}
        </div>
      )}
    </div>
  );
}
