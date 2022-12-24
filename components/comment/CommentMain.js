import { useEffect, useState } from "react";
import useComment from "../../controls/useComment";
import useRelations from "../../controls/useRelations";
import useUser from "../../controls/useUser";
import Writer from "../elements/Writer";
import CommentItem from "./CommentItem";

export default function CommentMain({
  postId,
  postUserId,
  hookComments,
  postUserSettings,
}) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const { relations } = useRelations();

  const {
    addComment,
    comments: comments_,
    removeComment,
    updateComment,
    checkCommentPrivacy,
  } = useComment({ postId, postUserId }, hookComments);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    comments_?.length <= 2 && setOpen(true);
    setComments(comments_);
  }, [comments_]);

  useEffect(() => {
    if (!postUserId || !relations) return;
    const privacy_ = checkCommentPrivacy(postUserId, postUserSettings);
    setPrivacy(privacy_);
  }, [postUserId, relations, postUserSettings]);

  return (
    <div className="pt-2  px-1">
      <p
        onClick={(_) => setOpen((p) => !p)}
        className=" cursor-pointer text-end px-3 text-sm float-right text-gray-400 -mt-7 "
      >
        {open
          ? comments?.length + " comments"
          : comments?.length <= 2
          ? comments?.length + " comments"
          : comments?.length - 2 + " more comments"}
      </p>
      {open && privacy && (
        <Writer
          autoFocus={false}
          onPost={(data, clear) => {
            addComment({ ...data, postId, postUserId }, clear);
          }}
          text="comment"
          user={user}
        />
      )}
      {open && (
        <div className=" w-full">
          {comments?.map((comment) => (
            <CommentItem
              par={[comments, setComments]}
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
                par={[comments, setComments]}
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
