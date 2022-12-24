import { useEffect, useState } from "react";
import useReply from "../../controls/useReply";
import ReplyItem from "./ReplyItem";

export default function ReplyMain({ postId, commentId, openReply }) {
  const [open, setOpen] = useState(false);
  const {
    replies: replies_,
    removeReply,
    updateReply,
  } = useReply(commentId, postId);

  const [replies, setReplies] = useState(replies_);

  useEffect(() => {
    setReplies(replies_);
  }, [replies_]);

  return (
    <div className="ring-1d ml-[2%]">
      <p
        onClick={(_) => setOpen((p) => !p)}
        className=" text-endd ring-1d cursor-pointer text-sm text-gray-400  "
      >
        {!open
          ? replies?.length > 1
            ? replies?.length - 1 + " more replies"
            : (replies?.length || "no") + " replies"
          : (replies?.length || "no") + " replies"}
      </p>
      {open && (
        <div className="pt-2">
          {replies?.map((reply) => (
            <ReplyItem
              par={[replies, setReplies]}
              data={reply}
              onDelete={removeReply}
              onUpdate={updateReply}
              openReply={openReply}
              key={reply?.id}
            />
          ))}
        </div>
      )}
      {!open && replies?.length >= 1 && (
        <div className="pt-2 ">
          {[replies?.[0]]?.map((reply) => (
            <ReplyItem
              par={[replies, setReplies]}
              data={reply}
              onDelete={removeReply}
              onUpdate={updateReply}
              openReply={openReply}
              key={reply?.id}
              too="one"
            />
          ))}
        </div>
      )}
    </div>
  );
}
