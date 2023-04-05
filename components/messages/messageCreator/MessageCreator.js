import React, { useState } from "react";
import Icon from "../../elements/Icon";
import Modal from "../../elements/Modal";
import MessageCreatorModal from "./MessageCreatorModal";

const MessageCreator = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex">
        <Icon onClick={() => setOpen(true)}>add</Icon>
      </div>
      {open && <MessageCreatorModal open={open} set={setOpen} />}
    </div>
  );
};

export default MessageCreator;
