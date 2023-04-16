import React, { useState } from "react";
import UseMessages from "../../../controls/chats/messages/useMessages";
import useChatMutator from "../../../controls/chats/useChatMutator";
import { useAlert } from "../../elements/Alert";
import Verifier from "../../elements/Verifier";

const GroupChatDeleter = ({ className }) => {
  const [open, setOpen] = useState(false);
  const { deleteConverse } = useChatMutator();
  const msg = UseMessages();
  const { pop } = useAlert();
  const converse = msg.selectedConverse;
  const onYesHandler = () => {
    deleteConverse(converse, () => {
      const nextSelect = msg?.converse?.filter(
        (c) => c.id !== converse?.id
      )?.[0];
      console.log("converse 0 = ", nextSelect);
      msg.set({ selectedConverse: nextSelect });
      pop("group chat deleted.");
    });
  };
  return (
    <div className={"" + className}>
      <button
        onClick={() => setOpen(true)}
        className="btn-warm self-end mt-auto "
      >
        {" "}
        delete group chat
      </button>
      <Verifier
        open={open}
        set={setOpen}
        onYes={onYesHandler}
        text={`are you sure delete this group chat?.
        all chats will be removed as well.`}
      />
    </div>
  );
};

export default GroupChatDeleter;
