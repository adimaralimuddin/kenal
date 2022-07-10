import { useState } from "react";
import useReply from "../../controls/useReply";
import ReplyItem from "./ReplyItem";

export default function ReplyMain({ postId, commentId, openReply }) {
  const [open, setOpen] = useState(false);
  const { replies, removeReply, updateReply } = useReply(commentId, postId);

  return (
    <div>
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
        <div className="pt-2">
          {[replies?.[0]]?.map((reply) => (
            <ReplyItem
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
