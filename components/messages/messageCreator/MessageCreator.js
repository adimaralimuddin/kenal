import React, { useState } from "react";
import Icon from "../../elements/Icon";
import MessageCreatorModal from "./MessageCreatorModal";

const MessageCreator = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex">
        <Icon
          className="cursor-pointer hover:bg-slate-100 rounded-md"
          onClick={() => setOpen(true)}
        >
          add
        </Icon>
      </div>
      {open && <MessageCreatorModal open={open} set={setOpen} />}
    </div>
  );
};

export default MessageCreator;
